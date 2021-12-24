import React, { Component }  from 'react';

import "./navbar.css";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Navbar = ({ click }) => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
    const getCartCount = () => {
      return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };
  
    const auth = useSelector(state => state.auth)

    const {user, isLogged, isAdmin, isSupport } = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    /*const telemetryLink = () => {
      return <li className="drop-nav">
          <Link to="#" className="avatar">
          <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
          </Link>
          <ul className="dropdown">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </ul>
      </li>
  }*/

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }


    return (
      
      <nav className="navbar">
        <div className="navbar__logo">
          <h2>EnvYard</h2>
        </div>
  
        <ul className="navbar__links">
          <li>
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>Cart<span className="cartlogo__badge">{getCartCount()}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/renting">Rent</Link>
          </li>
        
          { isLogged & !isAdmin & !isSupport ?
          <li>
              <Link to="/gardens">Your Gardens</Link>
          </li>
          :
          <></>
        }
          { isLogged & !isAdmin & !isSupport ?
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            :
            <></>
          }
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/create_question">Ask Question</Link>
          </li>
       
          {
            isAdmin ? 
           
            <li className="navbar-item">
              <Link to="/admin/users" className="nav-link">Users</Link>
            </li>
         
            :<></>
          }
          {
            isAdmin ? 
            <li className="navbar-item">
              <Link to="/create_user" className="nav-link">Create User</Link>
            </li>
            : <></>
          }
          {
            isSupport ? 
            <li className="navbar-item">
            <Link to="/support/reviews" className="nav-link">Reviews Dashboard</Link></li>
            : <></>
          }
          {
            isSupport ? 
            <li className="navbar-item">
            <Link to="/support/questions" className="nav-link">Questions</Link></li>
            : <></>
          }
          {
              isLogged
              ? userLink()
              :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
          }
        </ul>
        <div className="hamburger__menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
          
        </div>
      </nav>
    );
  };
  
  export default Navbar;