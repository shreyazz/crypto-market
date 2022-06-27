import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRegDetails({ ...regDetails, favCryptos: [...favCoins] });
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        regDetails
      );
      console.log(res.status);
    } catch (error) {
      if (error.response.status == 409) {
        setMessage({
          ...message,
          isError: true,
          isSuccess: false,
          message: "Email is already in use.",
        });
      }
      if (error.response.status == 422) {
        setMessage({
          ...message,
          isError: true,
          isSuccess: false,
          message: "Please fill all the fields, and select upto 3 cryptos.",
        });
      }
    }
  };
  const [message, setMessage] = useState({
    isError: false,
    isSuccess: false,
    message: "",
  });
  const [coins, setCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);
  const [regDetails, setRegDetails] = useState({
    name: "",
    email: "",
    password: "",
    favCryptos: [],
  });
  const handleFavCoins = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (favCoins.length < 3) {
        setFavCoins([...favCoins, value]);
      } else {
        e.target.checked = false;
        setMessage({
          ...message,
          isError: true,
          message: "You can only add upto three favorite cryptos.",
        });
      }
    } else {
      setFavCoins(favCoins.filter((e) => e !== value));
    }
  };
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    const getCoins = async () => {
      const coinsNames = [];
      const res = await axios.get("https://api.coingecko.com/api/v3/coins");
      const data = res.data;
      data.map((coin) => coinsNames.push(coin.id));
      setCoins([...coinsNames]);
    };
    getCoins();
  }, []);
  const handleChange = (e) => {
    setRegDetails({ ...regDetails, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)} className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
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
            onChange={(e) => handleChange(e)}
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
        {message && message.isError && (
          <Alert variant="danger" className="mt-4">
            {message.message}
          </Alert>
        )}
        <Form.Group>
          <div className="coins-div">
            <Form.Label>Select upto three coins</Form.Label>
            {coins.map((coin) => {
              return (
                <Form.Check
                  className="check"
                  key={coin}
                  name={coin}
                  value={coin}
                  label={coin}
                  onChange={(e) => handleFavCoins(e)}
                />
              );
            })}
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
