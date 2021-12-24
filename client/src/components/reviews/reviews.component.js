import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Review = props => (
  <tr>
    <td>{props.review.productname}</td>
    <td>{props.review.description}</td>
    <td>{props.review.rating}</td>
  </tr>
)

export default class ReviewsListProduct extends Component {
  constructor(props) {
    super(props);

    this.deletereview = this.deletereview.bind(this)

    this.state = {reviews: []};
  }

  componentDidMount() {
    axios.get('/reviews/')
      .then(response => {
        this.setState({ reviews: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletereview(id) {
    axios.delete('/reviews/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      reviews: this.state.reviews.filter(el => el._id !== id)
    })
  }

  reviewList() {
    return this.state.reviews.map(currentreview => {
      return <Review review={currentreview} deletereview={this.deletereview} key={currentreview._id}/>;
    }).filter(x => x.productname === this.productname)
  }

  render() {
    return (
      <div>
        <h3>Product Reviews</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.reviewList() }
          </tbody>
        </table>
      </div>
    )
  }
}