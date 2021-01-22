import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
//replaced by redux
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const HomeScreens = (location, history) => {
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {

        dispatch(listProducts())

        /* const fetchProducts = async () => {
             const { data } = await axios.get('/api/products')
             setProducts(data)
         }
 
         fetchProducts()
         */
    }, [dispatch])


    return (
        <>
            <h1 className="py-3">Latest Products</h1>
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : <Row>
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
