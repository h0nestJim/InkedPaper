import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import logoMain from '../images/logo_main.png';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import Search from './Search'
import {Route} from 'react-router-dom'


const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = ()=>{
        dispatch(logout())
    }

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
                        <Navbar bg="dark" className="nav-fill w-100 min-ch-100 m-0" >
                            <LinkContainer to="/store">
                                <Nav.Link>Shop</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/artists">
                                <Nav.Link>Artists</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title ={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>My Account</NavDropdown.Item>
                                    </LinkContainer>
                                    {userInfo && userInfo.isAdmin &&(
                                       <div>
                                       <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Admin: Manage Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Admin: Manage Products</NavDropdown.Item>
                                        </LinkContainer>
                                         <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Admin: Manage Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        </div>
                                        
                                    )}
                                    
                                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            )
                            :
                            <LinkContainer to="/login">
                                <Nav.Link>My Account</Nav.Link>
                            </LinkContainer>
                            }
                            



                            <LinkContainer to="/about">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Navbar>
                    </Navbar.Collapse>

                    <Navbar.Collapse id="nav-bar-search" className="mr-auto">
                        <Container>
                           
                           
                            <Route render={({history})=><Search history={history}></Search> }/>



                        </Container>

                    </Navbar.Collapse>
                
            </Navbar>
        </header >
    )
}

export default Header
