import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <h1>Edit Product</h1>

                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variat='danger'>{errorUpdate}</Message>}
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className='mt-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className='mt-3'>
                                <Form.Label>Image</Form.Label>
                                {/* <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control> */}
                                <Form.Control type='file' id='image-file' label='Choose File' custom onChange={uploadFileHandler}>
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='brand' className='mt-3'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock' className='mt-3'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category' className='mt-3'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description' className='mt-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' rows={3} type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Button className='mt-3' type='submit' variant='success'>Update</Button>
                        </Form>
                    )}
                </Col>

            </Row>
        </>
    )
}

export default ProductEditScreen
