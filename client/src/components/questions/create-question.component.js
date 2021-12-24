import React, { Component } from 'react';
import axios from 'axios';

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        q: '',
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeQuestion(e) {
    this.setState({
      q: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const question = {

        email: this.state.email,
        q: this.state.q,
    }

    console.log(question);

    axios.post('/questions/add', question)
      .then(res => console.log(res.data));

    this.setState({
        email: '',
        q: '',
    })
  }

  render() {
    return (
      <div>
        <h3>Ask Question</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
          <label>Email: </label>
            <input type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Question: </label>
            <input type="text"
                className="form-control"
                value={this.state.q}
                onChange={this.onChangeQuestion}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit Question" className="btn btn-success"/>
          </div>
        </form>
      </div>
    )
  }
}