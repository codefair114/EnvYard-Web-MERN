import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.role}</td>
    <td>
      <Link to={"/admin/edit_user/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteuser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class List extends Component {
  constructor(props) {
    super(props);

    this.deleteuser = this.deleteuser.bind(this)

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('/user/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteuser(id) {
    axios.delete('/user/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteuser={this.deleteuser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}