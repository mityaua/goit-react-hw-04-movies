import React, { Component } from 'react';

import api from '../../services/api';

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.movieId;

    const { cast } = await api.fetchCast(id);

    this.setState({
      actors: cast,
    });

    console.log(cast);
  }

  render() {
    return <h2>Cast</h2>;
  }
}

export default Cast;
