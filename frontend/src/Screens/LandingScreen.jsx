import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Carousel, Row, Col } from 'react-bootstrap'
import banner from '../images/flashbanner.jpg'
import banneralt from '../images/flashbanneralt.jpg'

const LandingScreen = (location, history) => {
    return (
        <div>

            <Carousel className="carouselMain py-0">
                <Carousel.Item className="carouselMain min-vw-100">
                    <img
                        className="d-block w-100"
                        src={banner}
                        alt="First slide"
                    />
                    <Carousel.Caption className="home-caption rounded">
                        <h3 className="carousel-h">Buy Original Flash Straight from the Artist</h3>
                        <Link className='btn btn-warning rounded mt-3' to='/store'>Browse All Prints</Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banneralt}
                        alt="second slide"
                    />

                    <Carousel.Caption className="home-caption rounded">
                        <h3 className="carousel-h">Find New Artists</h3>
                        <Link className='btn btn-warning rounded mt-3' to='/artists'>Browse Artists</Link>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
            <Container>
                <h1 className="py-4">Sell Your Flash</h1>
                <Row>
                    <Col>
                        <p>Aecenas quis molestie eros, sit amet dapibus tortor. In a dapibus tellus. Donec fringilla tellus et scelerisque aliquet. Morbi blandit tempor magna at vehicula. In efficitur porttitor purus, quis posuere nisi eleifend quis. Aliquam blandit arcu massa, eu pharetra risus tristique in.</p>

                    </Col>
                </Row>
                <Row>
                    <Link className='btn btn-outline-warning rounded px-5 mb-10 m-auto' to='/artists'>Browse Artists</Link>
                    <br></br>
                </Row>

            </Container>
        </div>
    )
}

export default LandingScreen
