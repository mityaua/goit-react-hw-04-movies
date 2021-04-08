import React, { Component } from 'react';
import Loader from '../Loader';

import api from '../../services/api';

class Reviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    this.setState({
      isLoading: true,
    });

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
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { reviews, isLoading } = this.state;

    return (
      <div>
        {isLoading && <Loader />}

        {reviews.length > 0 ? (
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
        )}
      </div>
    );
  }
}

export default Reviews;
