import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import api from '../../services/api';

class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  // Запрос за фильмами при поиске
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getMovies();
    }
  }

  // Принимает запрос с инпута и пишет его в стейт
  onChangeQuery = query => {
    this.setState({
      movies: [],
      searchQuery: query,
      currentPage: 1,
      error: null,
    });
  };

  // Фетч фильма по слову из инпута
  getMovies = async () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const results = await api.fetchMoviesBySearch(searchQuery, currentPage);

      this.setState(prevState => ({
        movies: [...prevState.movies, ...results],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.error('Smth wrong with search fetch', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { movies, isLoading } = this.state;

    return (
      <main>
        <SearchForm onSearch={this.onChangeQuery} />

        <h2>Search results</h2>
        <MovieList movies={movies} />

        {movies.length > 0 && <Button onClick={this.getMovies} />}

        {isLoading && <Loader />}
      </main>
    );
  }
}

export default MoviesPage;
