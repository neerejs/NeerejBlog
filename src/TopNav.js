import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import neerejLogo from './assets/Neerej.png'



const TopNav = (props) => {

    return (
        <>
            <div >
                <>
                      <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={neerejLogo}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                />{' '}
                                <span style={{fontSize:"30px"}}>Neerej Tech Notes</span>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                </>
            </div>

        </>
    )
}

export default TopNav;