//import React, { useState} from 'react'
import React, { useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'



const HomeScreen = () => {
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    const keyword = useParams().keyword
    const pageNumber = useParams().pageNumber

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList


    useEffect(() => {


        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    //const products = []


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> :
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            }
            <h1>Latest Products</h1>
            {loading ? (
                //<h2>Loading...</h2>
                <Loader />
            ) : error ? (
                //<h3>{error}</h3>
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} Page={page} keyword={keyword ? keyword : ''} />
                </>
            )}

        </>


    )
}

export default HomeScreen