import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Question = props => (
  <tr>
    <td>{props.question.email}</td>
    <td>{props.question.q}</td>
    <td>
      <a href="#" onClick={() => { props.deletequestion(props.question._id) }}>delete</a>
    </td>
  </tr>
)

export default class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.deletequestion = this.deletequestion.bind(this)

    this.state = {questions: []};
  }

  componentDidMount() {
    axios.get('/questions/')
      .then(response => {
        this.setState({ questions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletequestion(id) {
    axios.delete('/questions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      questions: this.state.questions.filter(el => el._id !== id)
    })
  }

  questionList() {
    return this.state.questions.map(currentquestion => {
      return <Question question={currentquestion} deletequestion={this.deletequestion} key={currentquestion._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Questions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Email</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            { this.questionList() }
          </tbody>
        </table>
      </div>
    )
  }
}