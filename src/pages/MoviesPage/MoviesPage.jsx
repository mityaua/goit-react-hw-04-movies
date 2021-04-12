import React, { Component } from 'react';
import queryString from 'query-string'; // Пакет для query string

import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import LoadMoreButton from '../../components/LoadMoreButton';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.min.css';

// Компонент страницы поиска фильмов
class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  // При монтировании страницы проверяет обьект location, и если данные есть то парсит и пишет в стейт
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
    const { history } = this.props;

    this.setState({
      movies: [],
      searchQuery: query,
      currentPage: 1,
      error: null,
    });

    // После поиска пишет в search истории шаблонную строку
    history.push({
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
        toast.info('Nothing found 🙄', {
          autoClose: 2000,
        });
      }

      this.setState(prevState => ({
        movies: [...prevState.movies, ...results],
        currentPage: prevState.currentPage + 1,
        isLoading: true,
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

        <ToastContainer />
      </main>
    );
  }
}

export default MoviesPage;
