import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { payOrder } from '../actions/orderActions'
import { useHistory } from "react-router-dom";
import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Form, Modal, Button } from "react-bootstrap";
import Field from "./Field";
import Message from '../Components/Message'

//css provided by stripe to format elements

const axios = require("axios");




//credit card element specific styling
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            fontWeight: 700,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "22px",
            color: "#424770",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: '#cccccc',
            },
            "::placeholder": {
                color: '#888',
            },
        },
        invalid: {
            iconColor: "red",
            color: "red",
            backgroundColor: "#ff8080"
        },
    },
};

//scredit card button sub component
const CardField = ({ onChange }) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

//submit button sub component
const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
        className={`btn btn-success btn-block rounded SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);

//component declaration
export default function CreditCardForm(props, { match }) {
    const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    let history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [price, setPrice] = useState(order.totalPrice);
    const [billingDetails, setBillingDetails] = useState({
        email: order.user.email,
        name: order.user.name,
        address: {
            line1: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.county}`,
            line2: shippingAddress.postcode,
        }
    });



    //resets state on completion
    const reset = () => {
        setError(null);
        setProcessing(false);
        setPrice(0);
        setSuccess(false);
        setCardComplete(false);
        setBillingDetails({
            email: order.user.email,
            name: order.user.name,
            address: {
                line1: ''
            }
        });
    };

    /*
    This code runs when a card transaction is submitted
    There are three main components to this function:
    	
        1. create a new stripe payment method using the form data
    	
        2. get a payment intent from the server using the speficied price
        3. confirm the payment intent using the new payment method
        4. send a confiemation to the server if the payment succeeded
    */
    const handleSubmit = async (event) => {
        console.log('SUBMITTED!')
        //prevent default form values
        event.preventDefault();

        ///if stripe api is loaded
        if (!stripe || !elements) {
            return;
        }

        //handle errors
        if (error) {
            console.log(error);
            elements.getElement("card").focus();
            return;
        }

        if (price === 0) {
            return;
        }

        //start processing animation on submit button
        if (cardComplete) {
            setProcessing(true);
        } else {
            return;
        }

        //STEP 1:
        //create new payment method based on card and form information
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        });

        //handle errors, otherwise set the new payment method in state
        if (payload.error) {
            setError(payload.error);
            return;
        }

        //STEP 2:
        //create a new payment request and get irs client secret + id from the server
        const intentData = await axios
            .post("/stripe", {
                //include the bet amount
                price: price,
            })
            .then(
                (response) => {
                    //SUCCESS: put client secret and id into an object and return it
                    return {
                        secret: response.data.client_secret,
                        id: response.data.intent_id,
                    };
                },
                (error) => {
                    //ERROR: log the error and return
                    setError(error)
                    return error;
                }
            );

        //STEP 3:
        //confirm the payment and use the new payment method
        const result = await stripe.confirmCardPayment(intentData.secret, {
            payment_method: payload.paymentMethod.id,
        });

        //handle errors again
        if (result.error) {
            setError(result.error);
            return
        }

        //STEP 4:
        // The payment has been processed! send a confirmation to the server
        if (result.paymentIntent.status === "succeeded") {
            const confirmedPayment = await axios
                .post("/confirm-payment", {
                    //include id of payment
                    payment_id: intentData.id,
                    payment_type: "stripe",
                    //send any other data here
                })
                .then(
                    (response) => {
                        //SUCCESS: return the response message
                        return response.data.success;
                    },
                    (error) => {
                        //ERROR:
                        console.log(error);
                        setError(error)
                        return error;
                    }
                );

            //reset the state and show the success message
            if (confirmedPayment) {

                //reset the form
                reset();

                /*
                 YOUR APPLICATION SPECIFIC CODE HERE:
                 for this example all we do is render a modal
                */

                setSuccess(true);

                dispatch(payOrder(order._id, success))

            }
        }
    }



    //render
    return (
        // the credit card form
        <Form className="Form" onSubmit={handleSubmit}>

            {/* Error modal */}
            <Modal show={error != null}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(event) => { setError(null) }}>Close</Button>
                </Modal.Footer>
            </Modal>


            {/* success banner, only shows after confirmation */}
            <Modal show={success}>
                <Modal.Header>
                    <Modal.Title>Payment Succeeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your card payment has been confirmed
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn" variant="success" onClick={() => { history.go(0) }}>Review Order</Button>

                </Modal.Footer>
            </Modal>

            {/* Bet amount field */}
            <Field
                label="Amount to Pay"
                id="bet"

                placeholder={Number(price)}
                required
                min="1"
                read-only
                value={price}
                onChange={(event) => {
                    if (event.target.value !== price) {
                        setPrice(price);
                    }
                    else {
                        setPrice(price);
                    }
                }}
            />

            {/* Credit Card Payment Form */}
            <fieldset className="FormGroup">
                {/* name field */}
                <Field
                    label="Name"
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    read-only
                    disabled='disabled'
                    value={billingDetails.name}
                    onChange={(event) => {
                        setBillingDetails({ ...billingDetails, name: event.target.value });
                    }}
                />
                {/* email field */}
                <Field
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="janedoe@gmail.com"
                    required
                    autoComplete="email"
                    value={billingDetails.email}
                    onChange={(event) => {
                        setBillingDetails({ ...billingDetails, email: event.target.value });
                    }}
                />
                {/* address fields */}
                <Field
                    label="Billing Address"
                    id="line1"
                    type="address-line1"

                    required

                    value={billingDetails.address.line1}
                    onChange={(event) => {
                        setBillingDetails({
                            ...billingDetails,
                            address: {
                                line1: event.target.value,
                                line2: billingDetails.address.line2
                            }
                        });
                    }}
                />
                {/* address line 2 */}
                <Field
                    label=""
                    id="line2"
                    type="address-line2"
                    placeholder="building/suite number"
                    autoComplete="address-line2"
                    value={billingDetails.address.line2}
                    onChange={(event) => {
                        setBillingDetails({
                            ...billingDetails,
                            address: {
                                line1: billingDetails.address.line1,
                                line2: event.target.value,
                            }
                        });
                    }}
                />
            </fieldset>

            {/* credit card field and submit button */}
            <fieldset className="FormGroup py-3">
                <Message variant="primary">Enter Card Payment Details Below</Message>
                {/* card */}

                <CardField
                    onChange={(event) => {

                        setCardComplete(event.complete);
                    }
                    }

                />

            </fieldset>

            <SubmitButton
                type="submit"
                processing={processing}
                error={error}
                disabled={!stripe}
            >
                Make Payment
            </SubmitButton>
        </Form>
    );

}