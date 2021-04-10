import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from '../Review';
import Loader from '../Loader';

import api from '../../services/api';

import styles from './Reviews.module.scss';

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
          <ul className={styles.List}>
            {reviews.map(({ id, author, content }) => {
              return (
                <li key={id} className={styles.Item}>
                  <Review author={author} content={content} />
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

Reviews.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Reviews;
