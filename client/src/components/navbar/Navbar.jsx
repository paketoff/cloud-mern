import React from 'react';
import Logo from '../../assets/img/logo.svg';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Navbar = () => {

  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className='navbar'>
      <img src={Logo} alt="" className='navbar__logo'/>
      <div className="navbar__header">MERN CLOUD</div>
      {!isAuth && <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>}
      {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>}
      {isAuth && <div className="navbar__logout" onClick={() => dispatch(logout())}>Logout</div>}
    </div>
  );
};

export default Navbar;