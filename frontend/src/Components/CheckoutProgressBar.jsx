import React, { useEffect } from 'react'
import { Nav, ProgressBar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutProgressBar = ({ step1, step2, step3, step4, val }) => {



    useEffect(() => {

    })

    return (
        <>
            <ProgressBar className='checkout-bar my-3' animated variant='warning rounded ' now={val} />
            <Nav className='justify-content-center mb-4'>



                <Nav.Item>
                    {step1 ? (
                        <LinkContainer to='/login'>
                            <Nav.Link className="progress-link">Sign In</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Sign In</Nav.Link>
                    )}
                </Nav.Item>

                <Nav.Item>
                    {step2 ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link className="progress-link">Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping Details</Nav.Link>
                    )}
                </Nav.Item>

                <Nav.Item>
                    {step3 ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link className="progress-link">Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment Details</Nav.Link>
                    )}
                </Nav.Item>

                <Nav.Item>
                    {step4 ? (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link className="progress-link">Review</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )}
                </Nav.Item>
            </Nav>

        </>
    )
}

export default CheckoutProgressBar
