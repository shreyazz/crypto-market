import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const NavBar = ({ setSearchedCoin }) => {
  useEffect(() => {
    verifyUser();
    setPathName(window.location.pathname);
  }, []);
  const navigate = useNavigate();
  const [userVerified, setUserVerified] = useState(false);
  const verifyUser = () => {
    const token = localStorage.getItem("token");
    if(token){
      if(jwt_decode(token).isVerified){
        setUserVerified(true)
      }else{
        setUserVerified(false);
      }
    }
    
  };
  // useEffect(() => {verifyUser()}, [])
  const [pathName, setPathName] = useState("");
  const handleChange = (e) => {
    setSearchedCoin(e.target.value);
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Crypto Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to={"/favCryptos"}>Favorite Coins</Link>
            <Link to={"/allCryptos"}>All Coins</Link>
            <Col>
              {userVerified ? (
               
                <Button variant="primary" onClick={logout}>
                  Log out
                </Button>
              ) : (
                <Button className="mx-3">
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </Button>
              )}
              {!userVerified && (
                <Button>
                  <Link className="link" to="/register">
                    Register
                  </Link>
                </Button>
              )}
            </Col>
          </Nav>
          {pathName == "/allCryptos" && (
            <div className="d-flex md">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => handleChange(e)}
              />
              <Button variant="outline-success" onClick={handleSearchClick}>
                Search
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
