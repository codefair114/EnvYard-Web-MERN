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

export default class ReviewsListCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {reviews: []};
  }

  componentDidMount() {
    axios.get('/reviews/')
      .then(response => {
        var res = response.data.filter(function (r) {
          return r.marked === "true";
        });
        this.setState({ reviews: res });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  reviewList() {
    return this.state.reviews.map(currentreview => {
      return <Review review={currentreview} key={currentreview._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>All reviews</h3>
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