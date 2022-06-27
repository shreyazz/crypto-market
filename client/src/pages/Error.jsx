import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);
  }, []);
  return (
    <Container className="mt-4">
      <Alert variant={"danger"}>
        You are lost... you will be redirected to the home page very soon!
      </Alert>
    </Container>
  );
};

export default Error;
