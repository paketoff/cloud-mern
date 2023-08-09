import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./registration/Registration";
import Authorization from "./authorization/Authorization";
import { useDispatch } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

function App() {

  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);
  //TODO: FIX ROUTES!
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="wrap">
          {!isAuth ? 
            <Routes >
              <Route path="/login" Component={Authorization} />
              <Route path="/registration" Component={Registration} />
              {/* <Navigate to="/login"/> */} 
            </Routes>
            : //ternarniy operator
            <Routes >
              <Route exact path="/disk" Component={Disk} />
              {/* <Navigate to="/"/> */} 
            </Routes>
          }
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
