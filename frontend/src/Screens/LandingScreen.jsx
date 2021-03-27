import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import FinishCheckout from '../Components/FinishCheckout'
import { useSelector } from 'react-redux'

const LandingScreen = (location, history) => {

    const checkoutMsg = useSelector(state => state.cart.cartItems)



    return (
        <div>
            {checkoutMsg.length > 0 && <FinishCheckout />}

            <Container className="banner-container">
                <img
                    className="d-block w-100"
                    src={'/images/flashbannermainlarge.png'}
                    alt="tattoo flash sheet"
                />
                <div class="text-block rounded text-center">
                    <h3 className="pt-3">Buy Original Flash Straight from the Artist</h3>
                    <Link className='btn btn-warning rounded px-4 my-2' to='/store'>Browse All Prints</Link>
                </div>
            </Container>

            <Container>
                <h1 className="py-4">Support Artists</h1>
                <Row>
                    <Col>
                        <p>Aecenas quis molestie eros, sit amet dapibus tortor. In a dapibus tellus. Donec fringilla tellus et scelerisque aliquet. Morbi blandit tempor magna at vehicula. In efficitur porttitor purus, quis posuere nisi eleifend quis. Aliquam blandit arcu massa, eu pharetra risus tristique in.</p>
                        <p>Aecenas quis molestie eros, sit amet dapibus tortor. In a dapibus tellus. Donec fringilla tellus et scelerisque aliquet. Morbi blandit tempor magna at vehicula. In efficitur porttitor purus, quis posuere nisi eleifend quis. Aliquam blandit arcu massa, eu pharetra risus tristique in.</p>

                    </Col>
                </Row>
                <Row>
                    <Link className='btn btn-outline-warning rounded px-5 mb-10 m-auto my-5' to='/artists'>Browse Artists</Link>

                </Row>

            </Container>
        </div >
    )
}

export default LandingScreen
