import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgressBar from '../Components/CheckoutProgressBar'
import Message from '../Components/Message'
import FormContainer from '../Components/formContainer'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()


    const cart = useSelector(state => state.cart)

    //calculate prices

    //round to two decimals
    const addDecimals = (num) => {
        return (Math.round(num * 100 / 100).toFixed(2))
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(5)
    cart.handling = addDecimals(Number((cart.itemsPrice * 0.1).toFixed(2)))
    cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.handling)))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success, order])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            handlingPrice: cart.handling,
            totalPrice: cart.totalPrice
        }))


    }




    return (
        <div>
            <FormContainer>
                <h1 className='py-3'>Review Order</h1>
                <CheckoutProgressBar step1 step2 step3 step4 val={100} />
            </FormContainer>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>

                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.county}, {cart.shippingAddress.postcode}, {cart.shippingAddress.country}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Review Items</h3>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty!</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>£{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>£{cart.shippingPrice}<p>All orders are sent in a tube with first class tracked postage</p></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Handling</Col>
                                    <Col>£{cart.handling}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><strong>Total</strong></Col>
                                    <Col><h3>£{cart.totalPrice}</h3></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItem>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroupItem>
                                <Button
                                    type='button'
                                    className='btn-block btn-warning'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >Place Order</Button>
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default PlaceOrderScreen
