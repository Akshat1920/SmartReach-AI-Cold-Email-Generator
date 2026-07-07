import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";



function App() {
  
  const {user , loading} = useAppContext();

  if(loading){
    return <p>Loading .....</p>;
  }
  
  return (

    <div>
      <Toaster/>
      <Routes>

        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App
