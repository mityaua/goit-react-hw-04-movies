import React, { Component } from 'react';
import api from '../../services/api';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const trends = await api.fetchTrends();

    console.log(trends);

    this.setState({
      movies: trends,
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <>
        <h2>Trends</h2>
        <ul>
          {movies.map(movie => {
            return <li key={movie.id}>{movie.title}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default HomePage;
