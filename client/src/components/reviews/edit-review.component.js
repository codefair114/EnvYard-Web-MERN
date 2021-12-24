import React, { Component } from 'react';
import axios from 'axios';

export default class EditReview extends Component {
  constructor(props) {
    super(props);

    this.onChangeMarked = this.onChangeMarked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        productname: '',
        description: '',
        rating: '',
        marked: ''
    }
  }

  componentDidMount() {
    axios.get('/reviews/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          productname: response.data.productname,
          description: response.data.description,
          rating: response.data.rating,
          marked: response.data.marked
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeMarked(e) {
    this.setState({
      marked: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const review = {
      email: this.state.email,
      productname: this.state.productname,
      description: this.state.description,
      rating: this.state.rating,
      marked: this.state.marked
    }

    console.log(review);

    axios.post('/reviews/update/' + this.props.match.params.id, review)
      .then(res => console.log(res.data));

    window.location = '/support/reviews';
  }

  render() {
    return (
    <div>
      <h3> Mark Review</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              className="form-control"
              value={this.state.email}
              />
        </div>
        <div className="form-group"> 
          <label>Product: </label>
          <input  type="text"
              className="form-control"
              value={this.state.productname}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              className="form-control"
              value={this.state.description}
              />
        </div>
        <div className="form-group">
          <label>Rating: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.rating}
              />
        </div>
        <div className="form-group">
          <label>Marked: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.marked}
              onChange={this.onChangeMarked}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Review Marked" className="btn btn-success"  />
        </div>
      </form>
    </div>
    )
  }
}