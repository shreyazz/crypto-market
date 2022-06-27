import React from "react";
import jwt_decode from "jwt-decode";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const FavCryptos = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    }
    if (token) {
      if(!jwt_decode(token).isVerified){
        navigate("/login", { replace: true });
      }
    }
  }, []);
  const decideScreen = () => {
    if(error){
      return (
        <div>
          <Alert variant="danger">You are not authorized</Alert>
        </div>
      )
    }
    else{
      return (
        <div>
          <h1>Welcome</h1>
        </div>
      )
    }
  }
  return (
    decideScreen()
  );
};

export default FavCryptos;
