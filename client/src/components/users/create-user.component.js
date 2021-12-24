import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        password: '',
        email: '',
        role: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {

        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        role: this.state.role
    }

    console.log(user);

    axios.post('/user/add', user)
      .then(res => console.log(res.data));

    this.setState({
        name: '',
        password: '',
        email: '',
        role: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
          <label>Name: </label>
            <input id="name" type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
            <label>Password: </label>
            <input id="password" type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
            <label>Email: </label>
            <input id="email" type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Role: </label>
            <input id="role" type="text"
                required
                className="form-control"
                value={this.state.role}
                onChange={this.onChangeRole}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-success"  />
          </div>
        </form>
      </div>
    )
  }
}