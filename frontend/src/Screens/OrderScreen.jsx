import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { getOrderDetails } from '../actions/orderActions'
import axios from 'axios'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const [stripeReady, setStripeReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    //calculate prices
    if (!loading) {
        //round to two decimals
        const addDecimals = (num) => {
            return (Math.round(num * 100 / 100).toFixed(2))
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.shippingPrice = addDecimals(5)
        order.handling = addDecimals(Number((order.itemsPrice * 0.0255).toFixed(2)))
        order.totalPrice = addDecimals((Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.handling)))
    }


    useEffect(() => {

        const addStripeScript = async () => {
            const { data: clientId } = await axios.get('/api/config/stripe')

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://js.stripe.com/v3/'
            script.onload = () => {
                setStripeReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.stripe) {
                addStripeScript()
            } else {
                setStripeReady(true)
            }
        }



        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, order, orderId])






    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        :
        <>
            <h1 className='py-3'>Order Number: {(order._id).slice(-6)}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <strong>Name:</strong>{order.user.name}<br></br>
                            <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a><br></br>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.county}, {order.shippingAddress.postcode}, {order.shippingAddress.country}
                            <br></br><br></br>
                            {order.isDelivered ? <Message variant="success">Delivered on: {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>

                            <strong>Method: </strong>
                            {order.paymentMethod}<br>
                            </br>
                            <br></br>
                            {order.isPaid ? <Message variant="success">Payment Succeded on: {order.paidAt}</Message> :
                                <Message variant='danger'>Payment not yet Complete</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Review Items</h3>
                            {order.orderItems.length === 0 ? <Message>Order is empty!</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x £{item.price} = £{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>£{order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>£{order.shippingPrice}<p>All orders are sent in a tube with first class tracked postage</p></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Handling</Col>
                                    <Col>£{order.handling}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><strong>Total</strong></Col>
                                    <Col><h3>£{order.totalPrice}</h3></Col>
                                </Row>
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
}

export default OrderScreen