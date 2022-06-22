import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Router, Navigate, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Login from './pages/Login'
import Error from "./pages/Error";
import Register from "./pages/Register";
import FavCryptos from "./pages/FavCryptos";
const App = () => {
  const token = localStorage.getItem('token');
  const [searchedCoin, setSearchedCoin] = useState('')
  return (
    <>
    <NavBar setSearchedCoin={setSearchedCoin}/>
    <Routes>
    {token  && <Route path="/" element={<Home/>}/>}
    {token && <Route path="/login" element={<Navigate replace to='/'/>}/>}

    <Route path="/" element={<Navigate replace to='/login'/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/favCryptos" element={<FavCryptos/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="*" element={<Error/>}/>

    </Routes>
    </>

  );
};

export default App;
