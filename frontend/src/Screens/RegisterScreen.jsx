import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../actions/userActions'
import FormContainer from '../Components/formContainer'




const RegisterScreen = ({ location, history }) => {

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
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    const clearuserData = () => {
        localStorage.removeItem('userInfo')
        dispatch(logout())
        history.push('/login')
    }

    return (
        <FormContainer>
            <h1 className='py-3'>Sign Up!</h1>
            {error && <h3 className="message-alert">{error}</h3>}
            {message && <h3 className="message-alert">{message}</h3>}
            {loading && <h3>Registering...</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type='name'
                        placeholder='Enter name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type='email'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                        type='password'
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <FormControl
                        type='password'
                        placeholder='Confirm password...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Button
                    type='submit'
                    variant='warning'
                    className="btn btn-block rounded"
                >Register</Button>


            </Form>
            <Row className="py-3 ">
                <Col className="align-items-center">
                    <h4 className="text-center">Have an account?</h4>


                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={clearuserData} className="btn btn-block" variant="outline-warning rounded">Sign In</Button>
                    {//<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In!</Link>
                    }
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
