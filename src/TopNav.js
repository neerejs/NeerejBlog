import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import neerejLogo from './assets/Neerej.png'
import { LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/Nav'

const TopNav = (props) => {

    return (
        <>
            <div >
                <>

                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={neerejLogo}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                />{' '}
                                <span style={{ fontSize: "30px" }}>Neerej Tech Notes</span>
                            </Navbar.Brand>

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <LinkContainer to="/">
                                        <Nav.Link >Home</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/contactus">
                                        <Nav.Link >Contact Us</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </>
            </div>

        </>
    )
}

export default TopNav;