import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Router, Navigate, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Login from './pages/Login'
import Error from "./pages/Error";
import Register from "./pages/Register";
const App = () => {
  const user = localStorage.getItem('token');
  const [searchedCoin, setSearchedCoin] = useState('')
  return (
    <>
    <NavBar setSearchedCoin={setSearchedCoin}/>
    <Routes>
    {user  && <Route path="/" element={<Home/>}/>}
    <Route path="/" element={<Navigate replace to='/login'/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="*" element={<Error/>}/>

    </Routes>
    </>

  );
};

export default App;
