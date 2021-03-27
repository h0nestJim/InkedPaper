import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'

const FinishCheckout = () => {
    return (
        <Container>

            <Row>

                <Col xs={12} sm={6}>
                    <p className="py-4 icon-trash"><b>It looks like you have items in your basket, return to checkout?</b></p>
                </Col>
                <Col xs={6} sm={3}>
                    <Link to='/cart'>
                        <Button variant="success" className="btn btn-block rounded my-3">Finish Checkout!</Button>
                    </Link>
                </Col>
                <Col xs={6} sm={3}>
                    <Link to='/store'>
                        <Button variant="danger" className="btn btn-block rounded my-3">I'm not done!</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default FinishCheckout
