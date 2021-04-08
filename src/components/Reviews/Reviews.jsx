import React, { Component } from 'react';

import api from '../../services/api';

class Reviews extends Component {
  state = {
    reviews: [],
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    try {
      const { results } = await api.fetchReviews(movieId);
      console.log(results);

      this.setState({
        reviews: [...results],
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with fetch reviews on movie page', error);
      this.setState({ error });
    }
  }

  render() {
    const { reviews } = this.state;

    return reviews.length > 0 ? (
      <ul>
        {reviews.map(review => {
          return (
            <li key={review.id}>
              <span>{review.author}</span>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>We don't have any reviews for this movie</p>
    );
  }
}

export default Reviews;
