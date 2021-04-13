// Вариант на хуках
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'; // Пакет для query string
import { ToastContainer, toast } from 'react-toastify';

import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';
import LoadMoreButton from '../../components/LoadMoreButton';
import Loader from '../../components/Loader';

import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.min.css';

// Компонент страницы поиска фильмов
const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { search } = location;
  const { query } = queryString.parse(search);

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  // При монтировании делает запрос за фильмами. Если query в search пустой то ничего не делает.
  useEffect(() => {
    if (!query) return;

    getMovies();
    // eslint-disable-next-line
  }, [query]);

  // Фетч фильма по запросу из инпута
  const getMovies = async () => {
    setLoading(true);

    try {
      const results = await api.fetchMoviesBySearch(searchQuery, page);

      if (results.length === 0) {
        toast.info('Nothing found 🙄', {
          autoClose: 2000,
        });
      }

      setMovies(prev => [...prev, ...results]);
      setPage(prev => prev + 1);
      setLoading(true);
    } catch (error) {
      console.error('Smth wrong with search fetch', error);
      setError({ error }); // Почему не пишет?
    } finally {
      setLoading(false);
    }
  };

  // Принимает запрос с инпута и пишет его в стейт
  const onChangeQuery = query => {
    setMovies([]);
    setSearchQuery(query);
    setPage(1);
    setError(null);

    // После поиска пишет в search истории шаблонную строку
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <main>
      <SearchForm onSearch={onChangeQuery} />

      <MovieList movies={movies} />

      {movies.length > 0 && <LoadMoreButton onClick={getMovies} />}

      {isLoading && <Loader />}

      <ToastContainer />
    </main>
  );
};

export default MoviesPage;

// Вариант на классах

// import React, { Component } from 'react';
// import queryString from 'query-string'; // Пакет для query string
// import { ToastContainer, toast } from 'react-toastify';

// import SearchForm from '../../components/SearchForm';
// import MovieList from '../../components/MovieList';
// import LoadMoreButton from '../../components/LoadMoreButton';
// import Loader from '../../components/Loader';

// import api from '../../services/api';
// import 'react-toastify/dist/ReactToastify.min.css';

// // Компонент страницы поиска фильмов
// class MoviesPage extends Component {
//   state = {
//     movies: [],
//     searchQuery: '',
//     currentPage: 1,
//     isLoading: false,
//     error: null,
//   };

//   // При монтировании страницы берём из пропсов location два параметра: search и pathname.
//   // Парсим из обьекта search строку query
//   // Проверяем на наличие search && pathname и если есть тогда обновляет в стейте searchQuery на query
//   componentDidMount() {
//     const { search, pathname } = this.props.location;
//     const { query } = queryString.parse(search);

//     if (search && pathname) {
//       this.setState({
//         searchQuery: query,
//       });
//     }
//   }

//   // Запрос за фильмами при поиске
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.getMovies();
//     }
//   }

//   // Принимает запрос с инпута и пишет его в стейт
//   onChangeQuery = query => {
//     const { history } = this.props;

//     this.setState({
//       movies: [],
//       searchQuery: query,
//       currentPage: 1,
//       error: null,
//     });

//     // После поиска пишет в search истории шаблонную строку
//     history.push({
//       search: `query=${query}`,
//     });
//   };

//   // Фетч фильма по запросу из инпута
//   getMovies = async () => {
//     const { searchQuery, currentPage } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const results = await api.fetchMoviesBySearch(searchQuery, currentPage);

//       if (results.length === 0) {
//         toast.info('Nothing found 🙄', {
//           autoClose: 2000,
//         });
//       }

//       this.setState(prevState => ({
//         movies: [...prevState.movies, ...results],
//         currentPage: prevState.currentPage + 1,
//         isLoading: true,
//       }));
//     } catch (error) {
//       console.error('Smth wrong with search fetch', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   render() {
//     const { movies, isLoading } = this.state;

//     return (
//       <main>
//         <SearchForm onSearch={this.onChangeQuery} />

//         <MovieList movies={movies} />

//         {movies.length > 0 && <LoadMoreButton onClick={this.getMovies} />}

//         {isLoading && <Loader />}

//         <ToastContainer />
//       </main>
//     );
//   }
// }

// export default MoviesPage;
