import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
//replaced by backend
//import products from '../products'
//replaced by redux
//import axios from 'axios'

const ProductScreen = ({ match }) => {

    //replaced by backend
    //const product = products.find((p) => p._id === match.params.id);

    //replaced by redux
    //const [product, setProduct] = useState({})

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {

        dispatch(listProductDetails(match.params.id))

        /*const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()
        */
    }, [dispatch, match.params])


    return (
        <div>
            <Link className='btn btn-outline-warning my-3 rounded' to='/'>Back to Shop</Link>
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : (
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
                                {product.description}
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
                                        <Col>{product.stock > 0 ? 'In Stock!' : 'Out of Stock!'}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button className="btn-block btn-warning rounded" type="button" disabled={product.stock === 0}>Add to Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}


        </div>


    )
}

export default ProductScreen
