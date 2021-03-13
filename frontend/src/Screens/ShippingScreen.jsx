import React, { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/formContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutProgressBar from '../Components/CheckoutProgressBar'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [county, setCounty] = useState(shippingAddress.county)
    const [postcode, setPostcode] = useState(shippingAddress.postcode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(saveShippingAddress({ address, city, county, postcode, country }))
        history.push('/payment')
    }

    return <FormContainer>

        <h1 className='py-3'>Shipping</h1>
        <CheckoutProgressBar step1 step2 val={50} />
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Street Address:</Form.Label>
                <FormControl
                    type='address'
                    placeholder='Street address...'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></FormControl>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City:</Form.Label>
                <FormControl
                    type='city'
                    placeholder='City'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></FormControl>
            </Form.Group>
            <Form.Group controlId='county'>
                <Form.Label>County:</Form.Label>
                <FormControl
                    type='county'
                    placeholder='County'
                    value={county}
                    required
                    onChange={(e) => setCounty(e.target.value)}
                ></FormControl>
            </Form.Group>
            <Form.Group controlId='postcode'>
                <Form.Label>Postcode:</Form.Label>
                <FormControl
                    type='postcode'
                    placeholder='Postcode'
                    value={postcode}
                    required
                    onChange={(e) => setPostcode(e.target.value)}
                ></FormControl>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country:</Form.Label>
                <FormControl
                    type='country'
                    placeholder='Country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></FormControl>
            </Form.Group>
            <Button type='submit' className="btn-block btn-warning rounded" >
                Continue
            </Button>
        </Form>


    </FormContainer>
}

export default ShippingScreen
