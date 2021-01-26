import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroupItem, Image, Form, Button, ListGroup, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    //whatever is in the url after the ? will store in qty
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const cartItems = cart
    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className="py-3">Your Basket</h1>
                {cart.cartItems.length === 0 ? (<h2>Your basket is empty!<Link className=" btn btn-warning rounded mx-3" to="/store">Back to Shop?</Link></h2>
                ) : (
                        <ListGroup variant="flush">
                            {cart.cartItems.map(item => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <h3><Link to={`/product/${item.product}`}>{item.name}</Link></h3>
                                        </Col>
                                        <Col md={2}>
                                            <p>£{item.price}</p>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.stock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant='light' onClick={
                                                () => removeFromCartHandler(item.product)
                                            }><span class="material-icons icon-dark">
                                                    delete
                                                </span></Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                            ))}
                            <ListGroupItem>
                                <p>Not done? <Link className=" btn btn-outline-warning rounded mx-3" to="/store">Continue Shopping</Link></p>
                            </ListGroupItem>


                        </ListGroup>
                    )


                }
            </Col>
            <Col md={4}>
                <Card className="mt-3 rounded">
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items:</h3>
                            <p>£{cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>

                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to="/checkout">
                                <Button
                                    type="button"
                                    className="btn-block btn-warning"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={checkOutHandler}
                                >Proceed to Checkout!</Button>
                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen
