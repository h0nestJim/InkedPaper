import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure? Deletion is Permanent!')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())

    }

    return (
        <>
            <Row className='align-items-cetner'>
                <Col>
                    <h1 className="py-3">Product Manager Dashboard</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3 btn-warning rounded' onClick={createProductHandler}>

                        Create New Product
                    </Button>
                </Col>


            </Row>
            {loadingDelete && <h2>Loading...</h2>}
            {errorDelete && <h2 className="messsage-alert">{errorDelete}.</h2>}
            {loadingCreate && <h2>Loading...</h2>}
            {errorCreate && <h2 className="messsage-alert">{errorCreate}.</h2>}
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3>
                :
                (<Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Artist</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>£{product.price}</td>
                                <td>{product.artist}</td>
                                <td>{product.description}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className="btn-sm"><span class="material-icons">
                                            edit
                                        </span></Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm rounded'
                                        onClick={() => { deleteHandler(product._id) }}><span class="material-icons">
                                            delete_forever
                                        </span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>)}
        </>
    )
}

export default ProductListScreen