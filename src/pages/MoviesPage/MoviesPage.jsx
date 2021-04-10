import React, { Component } from 'react';
import queryString from 'query-string'; // Пакет для query string

import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import LoadMoreButton from '../../components/LoadMoreButton';

import api from '../../services/api';

// Компонент страницы поиска фильмов
class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  // При монтировании страницы проверяет строку запроса, и если данные есть то подставляет
  componentDidMount() {
    const { search, pathname } = this.props.location;

    if (search && pathname) {
      this.setState({
        searchQuery: queryString.parse(search).query,
      });
    }
  }

  // Запрос за фильмами при поиске
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getMovies();
    }
  }

  // Принимает запрос с инпута и пишет его в стейт
  onChangeQuery = query => {
    const { history, location } = this.props;

    this.setState({
      movies: [],
      searchQuery: query,
      currentPage: 1,
      error: null,
    });

    // После поиска обновляет url и search шаблонной строкой
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  // Фетч фильма по запросу из инпута
  getMovies = async () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const results = await api.fetchMoviesBySearch(searchQuery, currentPage);

      if (results.length === 0) {
        console.log('nothing');
      }

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

        <MovieList movies={movies} />

        {movies.length > 0 && <LoadMoreButton onClick={this.getMovies} />}

        {isLoading && <Loader />}
      </main>
    );
  }
}

export default MoviesPage;
