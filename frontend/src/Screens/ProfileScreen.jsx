import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'






const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))

        }
    }

    return <>
        <Row>
            <h1 className="py-3 w-100">My Account</h1>
        </Row>
        <Row>
            <Col md={3}>
                <h2 className='py-3'>Edit Details</h2>
                {error && <h3 className="message-alert">{error}</h3>}
                {message && <h3 className="message-alert">{message}</h3>}
                {success && <h3 className="message-alert-success">Profile Updated Successfully!</h3>}
                {loading && <h3>Registering...</h3>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Update Account Name</Form.Label>
                        <FormControl
                            type='name'
                            placeholder='Enter name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Update Account Email</Form.Label>
                        <FormControl
                            type='email'
                            placeholder='Enter email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Update Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Enter password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Updated Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Confirm password...'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='outline-warning rounded'>Update!</Button>


                </Form>

            </Col>
            <Col md={9}>
                <h2 className="py-3">My Order History</h2>
                <br></br>
                <h3>No orders yet!</h3>
            </Col>
        </Row>
    </>
}

export default ProfileScreen
