import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../Components/formContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'



const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setisAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        }
        else {

            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setisAdmin(user.isAdmin)
            }
        }

    }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to="/admin/userList" className="btn btn-warning my-3">Back to Users</Link>

            <FormContainer>
                <h1 className='py-3'>Update User</h1>
                {loadingUpdate && <h2>Loading...</h2>}
                {errorUpdate && <h2 className="message-alert">{errorUpdate}</h2>}
                {error && <h2 className="message-alert">{error}</h2>}

                {loading ? <h2>Loading...</h2> :
                    (

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

                            <Form.Group controlId='isAdmin'>

                                <FormCheck
                                    type='checkbox'
                                    label='Is an Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setisAdmin(e.target.checked)}
                                ></FormCheck>
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'>Update</Button>


                        </Form>
                    )}



            </FormContainer>
        </>

    )
}

export default UserEditScreen
