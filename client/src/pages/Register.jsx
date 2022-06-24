import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const [coins, setCoins] = useState([])
  const [regDetails, setRegDetails] = useState({
    name: "",
    email: "",
    password: "",
    favCryptos: [],
  });
  const [coinArr, setCoinArr] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };
  useEffect( () => {
    const getCoins = async () => {
      const coinsNames = [];
      const res = await axios.get("https://api.coingecko.com/api/v3/coins");
      const data = res.data;
     data.map((coin) => coinsNames.push(coin.id))
     setCoins([...coinsNames])
    }
   getCoins()
  }, []);
  const handleChange = () => {};
  const setCoinArray = (e) => {
    console.log(e.target.checked, e.target.name);
    
  };
  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)} className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            Don't worry we wont share it with anyone.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="password"
          />{" "}
        </Form.Group>
        <Form.Group>
          {" "}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="show password"
            onClick={toggleShowPassword}
          />
        </Form.Group>
        <Form.Group>
        <div className="coins-div">
        <Form.Label>Select three coins</Form.Label>
        {
          coins.map(coin => {
            return (<>
              <Form.Check
              key={coin}
            label={coin}
            name={coin}
            type="checkbox"
            className="check"
            onClick={(e) => setCoinArray(e)}
          />
            </>)
          })
        }
        </div>
        
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
