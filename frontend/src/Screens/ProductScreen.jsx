import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import axios from 'axios'
//replaced by backend
//import products from '../products'

const ProductScreen = ({ match }) => {

    //replaced by backend
    //const product = products.find((p) => p._id === match.params.id);

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()
    }, [match.params])


    return (
        <div>
            <Link className='btn btn-outline-warning my-3 rounded' to='/'>Back to Shop</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>By {product.artist}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: £{product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>£{product.price}</strong></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock!' : 'Out of Stock!'}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className="btn-block btn-warning rounded" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>


    )
}

export default ProductScreen
