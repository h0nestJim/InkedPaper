import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push('/store')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline className='py-2'>
            <Form.Control type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search all flash..."

                inline
            ></Form.Control>
            <Button
                type='submit'
                variant='outline-warning rounded'
                className='px-3 mx-4'
                inline
            >Search Products</Button>
        </Form>
    )
}

export default Search
