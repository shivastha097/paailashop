import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        // DISPATCH LOGIN
        dispatch(login(email, password))
    }

    return (
        <Row className='justify-content-center'>
            <Col md={5} >
            <Card className='mt-4 px-3'>
                    <Card.Body>
                    <>
                            <h1 className='text-center mb-4'>Sign In</h1>

                            { error && <Message variant='danger'>{error}</Message> }
                            { loading && <Loader/> }

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password' className='mt-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button className='mt-3' type='submit' variant='success'>Sign In</Button>
                            </Form>

                            <Row className='py-3'>
                                <Col>
                                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                                </Col>
                            </Row>
                        </>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        
    )
}

export default LoginScreen
