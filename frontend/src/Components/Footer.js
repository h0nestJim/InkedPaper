import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <div>
            <br></br>
            <br></br>
        <footer>
            <Container>
                
                <Row>
                    <Col className='text-center py-3'>
                        &copy; 2021 Inked Paper | All artwork used with permission
                    </Col>
                </Row>
            </Container>
        </footer>
        </div>
    )
}

export default Footer
