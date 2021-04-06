import React, { Component } from 'react';

import api from '../../services/api';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.movieId;

    const { results } = await api.fetchReviews(id);

    this.setState({
      reviews: results,
    });

    console.log(results);
  }

  render() {
    return (
      <ul>
        {this.state.reviews.length > 0
          ? 'Yes'
          : 'We dont have any reviews for this movie'}

        {this.state.reviews.map(review => {
          return (
            <li key={review.id}>
              <span>{review.author}</span>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Reviews;
