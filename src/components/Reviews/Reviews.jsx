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
    return <h2>Reviews</h2>;
  }
}

export default Reviews;
