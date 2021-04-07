import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

class HomePage extends Component {
  state = {
    movies: [],
    error: null,
  };

  // Запрос за трендами при маунте
  async componentDidMount() {
    try {
      const trends = await api.fetchTrends();

      this.setState({
        movies: trends,
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with homepage trends fetch', error);
      this.setState({ error });
    }
  }

  render() {
    const { movies } = this.state;

    // Пересмотреть формирование урла для Link
    return (
      <>
        <h2>Trending today</h2>
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default HomePage;
