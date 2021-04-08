import React, { Component } from 'react';
import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import api from '../../services/api';

class HomePage extends Component {
  state = {
    trends: [],
    isLoading: false,
    error: null,
  };

  // Запрос за трендами при маунте
  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    try {
      const movies = await api.fetchTrends();

      this.setState({
        trends: movies,
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with homepage trends fetch', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { trends, isLoading } = this.state;

    return (
      <main>
        <h2>Trending today</h2>
        <MovieList movies={trends} />

        {isLoading && <Loader />}
      </main>
    );
  }
}

export default HomePage;
