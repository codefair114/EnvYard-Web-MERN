import React, { Component } from 'react';
import axios from 'axios';

export default class CreateReview extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeProductname = this.onChangeProductname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        productname: this.props.productname,
        description: '',
        rating: '',
        marked: ''
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeProductname(e) {
    this.setState({
      productname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const review = {

        email: this.state.email,
        productname: this.state.productname,
        description: this.state.description,
        rating: this.state.rating,
        marked: 'false'
    }

    console.log(review);

    axios.post('/reviews/add', review)
      .then(res => console.log(res.data));

    this.setState({
        email: '',
        productname: this.productname,
        description: '',
        rating: '',
        marked: 'false'
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Review</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
          <label>Email: </label>
            <input type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Product Name: </label>
            <input type="text"
                className="form-control"
                value={this.props.productname}
                />
            <label>Description: </label>
            <input type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
            <label>Rating: </label>
            <input type="number"
                required
                className="form-control"
                value={this.state.rating}
                onChange={this.onChangeRating}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit Review" className="btn btn-success" />
          </div>
        </form>
      </div>
    )
  }
}