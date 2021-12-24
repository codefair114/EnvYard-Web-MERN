import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        password: '',
        email: '',
        role: ''
    }
  }

  componentDidMount() {
    axios.get('/user/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          password: response.data.password,
          email: response.data.email,
          role: response.data.role
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
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
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
    }

    console.log(user);

    axios.post('/user/update_r/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/admin/users';
  }

  render() {
    return (
    <div>
      <h3> Edit User </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <label>Name: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
        <label>Email: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
       
        <div className="form-group">
          <label>Role: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.role}
              onChange={this.onChangeRole}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="User Update" className="" />
        </div>
      </form>
    </div>
    )
  }
}