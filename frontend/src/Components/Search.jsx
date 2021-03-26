import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

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
        <Form onSubmit={submitHandler} className='py-2'>
            <Row>
                <Col sm={6} md={6}>
                    <Form.Control type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search all flash..."
                        className='mx-4 py-2'

                    ></Form.Control>
                </Col>
                <Col sm={6} md={6}>
                    <Button
                        type='submit'
                        variant='outline-warning rounded'
                        className='mx-4 py-2'>
                        Search
                    </Button>
                </Col>

            </Row>


        </Form>
    )
}

export default Search
