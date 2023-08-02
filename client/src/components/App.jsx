import React from "react";
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./registration/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="wrap">
          <Routes >
            <Route path="/registration" Component={Registration} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
