import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarAdmin extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/support/reviews" className="navbar-brand">Dashboard Admin</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/admin/users" className="nav-link">Users</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create_user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin/charts" className="nav-link">Charts</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}