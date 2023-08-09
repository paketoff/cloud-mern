import React, { useState } from "react";
import "./authorization.scss";
import Input from "../../utils/input/Input";
import { login } from "../../actions/user";
import {useDispatch} from "react-redux";
import thunk from "redux-thunk" ;
import { createStore, applyMiddleware } from 'redux';

const Authorization = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="authorization">
      <div className="authorization__header">Authorization</div>
      <Input value={email} setValue={setEmail} type="email" placeholder="Enter your email..."/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter your password..."/>
      <button className="authorization__btn" 
      onClick={() => dispatch(login(email, password))}>Log In</button>
    </div>
  );
};

export default Authorization;