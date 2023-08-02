import React from 'react';
import Logo from '../../assets/img/logo.svg';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={Logo} alt="" className='navbar__logo'/>
      <div className="navbar__header">MERN CLOUD</div>
      <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>
      <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>
    </div>
  );
};

export default Navbar;