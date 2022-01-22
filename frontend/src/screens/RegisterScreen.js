import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
        // DISPATCH REGISTER
    }

    return (
        <>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='mt-4'>
                        <Card.Body>
                            <h1 className='text-center mb-3'>Sign Up</h1>

                            { message && <Message variant='danger'>{message}</Message> }
                            { error && <Message variant='danger'>{error}</Message> }
                            { loading && <Loader/> }

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email' className='mt-3'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password' className='mt-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='confirmPassword' className='mt-3'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button className='mt-3' type='submit' variant='success'>Register</Button>
                            </Form>

                            <Row className='py-3'>
                                <Col className='text-center'>
                                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default RegisterScreen
