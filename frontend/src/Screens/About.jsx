import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import framedflash from '../images/framedflash.jpg'

const About = (location, history) => {
    return (
        <div>
            <h1 className="py-3">Our Mission</h1>
            <Container>
                <Row>
                    <Col>
                        <p>
                            Proin aliquet enim vel elit sodales, sed pellentesque justo egestas. In risus neque, tincidunt at lectus quis, consequat mattis velit. Duis bibendum ex arcu, non vehicula arcu dictum in. Donec turpis risus, pretium nec mattis ut, maximus vel nunc. Nam arcu felis, dignissim mattis libero quis, consectetur fringilla risus. Nunc dictum risus nunc, at dapibus sem tincidunt id. Morbi commodo sollicitudin nisl, ut pellentesque ante luctus id. Cras scelerisque quis enim at mollis.
                    </p>
                        <p>
                            Nunc convallis nulla rutrum libero faucibus, a molestie massa placerat. Quisque sollicitudin sem et ipsum tristique, non ullamcorper lacus semper. Etiam quam orci, venenatis vel turpis eget, ullamcorper mollis diam. Suspendisse venenatis, orci ac vestibulum volutpat, quam enim porta sem, ut accumsan mi risus id nisl. Sed iaculis sapien luctus, condimentum dui quis, eleifend diam.
                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img className="large-image py-3 rounded" src={framedflash} alt="framed flash art"></img>
                    </Col>
                </Row>
                <Row>
                    <Col className="justify-content-center">

                        <Link className='btn btn-center btn-outline-warning rounded px-4' to='/store'>Browse Flash</Link>
                    </Col>
                    <Col className="justify-content-center">
                        <Link className='btn btn-center btn-warning rounded px-5' to='/login'>Sign up</Link>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default About
