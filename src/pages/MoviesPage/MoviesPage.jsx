import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../../components/SearchForm';

import api from '../../services/api';

class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: '',
    currentPage: 1,
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

    try {
      const results = await api.fetchMoviesBySearch(searchQuery, currentPage);

      this.setState(prevState => ({
        movies: [...prevState.movies, ...results],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      this.setState({ error });
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <>
        <SearchForm onSearch={this.onChangeQuery} />

        <h2>Search results</h2>

        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${this.props.match.url}/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>

        {movies.length > 0 && (
          <button type="button" onClick={this.getMovies}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default MoviesPage;
