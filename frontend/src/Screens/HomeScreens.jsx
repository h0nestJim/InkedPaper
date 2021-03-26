import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../Components/Loader'

const HomeScreens = ({ location, history, match }) => {
    //const [products, setProducts] = useState([])


    //for search bar
    const keyword = match.params.keyword


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {

        dispatch(listProducts(keyword))

    }, [dispatch, keyword])


    return (
        <>
            <h1 className="py-3">Latest Products</h1>
            {loading ? <Loader /> : error ? <h3>{error}</h3> : <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4}>
                        <Product product={product} />
                    </Col>
                ))}

            </Row>}

        </>
    )
}

export default HomeScreens
