import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
const NavBar = ({setSearchedCoin}) => {
    const token = localStorage.getItem('token');
    const [userVerified, setUserVerified] = useState(false)
    const verifyUser = () => {
        const user = localStorage.getItem('token');
        setUserVerified(user.isVerified ? true : false)
    }
    // useEffect(() => {verifyUser()}, [])
    const [pathName, setPathName] = useState('')
    const handleChange = (e) => {
        setSearchedCoin(e.target.value);
    }
    const handleSearchClick = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        setPathName(window.location.pathname)
    }, [])
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Crypto Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Favorite Coins</Nav.Link>
            <Nav.Link href="#action2">All Coins</Nav.Link>
            <Col>

        {!userVerified ? <Button className='mx-3'><Link className='link' to='/login'>Login</Link></Button> : <Button variant='primary'>Log out</Button>}
        {!userVerified && <Button><Link className='link' to='/register'>Register</Link></Button>}
        </Col>

          </Nav>
          {pathName == '/all-coins' && <div  className="d-flex md">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => handleChange(e)}
            />
            <Button variant="outline-success" onClick={handleSearchClick}>Search</Button>
          </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
