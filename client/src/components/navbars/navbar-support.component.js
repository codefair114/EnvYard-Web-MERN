import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
export default class NavbarSupport extends Component {
  
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/support/reviews" className="navbar-brand">Dashboard Support</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create_review" className="nav-link">Create</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}