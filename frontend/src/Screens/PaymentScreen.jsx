import React, { useState } from 'react'
import { Form, FormGroup, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/formContainer'
import CheckoutProgressBar from '../Components/CheckoutProgressBar'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return <FormContainer>

        <h1 className='py-3'>Payment Method</h1>
        <CheckoutProgressBar step1 step2 step3 val={70} />
        <Form onSubmit={submitHandler} className="py-4">
            <FormGroup>
                <Form.Label as='legend'>Select Method</Form.Label>

                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or CreditCard'
                        id='Paypal'
                        name='paymentMethod'
                        value='Paypal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </FormGroup>
            <Button type='submit' className="btn-block btn-warning rounded my-4" >
                Continue
            </Button>
        </Form>


    </FormContainer>
}

export default PaymentScreen
