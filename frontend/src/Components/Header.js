import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import logoMain from '../images/logo_main.png';

const Header = () => {
    return (
        <header>
            <Navbar className="nav-fill w-100" bg="light" expand="x">
                <Container>
                    <Nav.Link><Navbar.Toggle aria-controls="basic-navbar-nav" /></Nav.Link>

                    <LinkContainer to="/">
                    <Navbar.Brand ><img className='logo' src={logoMain} alt="logo" /></Navbar.Brand>
                    </LinkContainer>
                    

                    

                    <LinkContainer to="/cart">
                    <Nav.Link> <span class="material-icons icon-dark">
                        shopping_cart
                        </span></Nav.Link>
                    </LinkContainer>
                    </Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar bg="dark" className="nav-fill w-100 min-ch-100" >
                            <LinkContainer to="/store">
                                <Nav.Link>Shop</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/artists">
                                <Nav.Link>Artists</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>My Account</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Navbar>
                    </Navbar.Collapse>

                    <Navbar.Collapse id="nav-bar-search" className="mr-auto">
                        <Container>
                            <Form inline className="py-2">
                                <FormControl type="text" placeholder="Search" className="mr-sm-2 mr-auto" />
                                <Button variant="outline-warning rounded">Search</Button>
                            </Form>
                        </Container>

                    </Navbar.Collapse>
                
            </Navbar>
        </header >
    )
}

export default Header
