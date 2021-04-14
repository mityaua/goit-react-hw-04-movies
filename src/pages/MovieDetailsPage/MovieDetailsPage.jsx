// Вариант на хуках
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import GoBackButton from '../../components/GoBackButton';
import Movie from '../../components/Movie';
import MovieNavigation from '../../components/MovieNavigation';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import Loader from '../../components/Loader';

import routes from '../../routes';
import api from '../../services/api';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  // Запрос при маунте
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // Функция запроса за фильмом
  const getData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const result = await api.fetchMovieById(movieId);

      setMovie(result);
    } catch (error) {
      console.error('Smth wrong with fetch movie on movie page', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  // Функция для кнопки "Назад"
  const handleGoBack = () => {
    history.push(location?.state?.from || routes.home);
  };

  return (
    <>
      <GoBackButton onBack={handleGoBack} />

      {movie && <Movie movie={movie} />}

      {movie && <MovieNavigation />}

      {/* Роутинг на основе match.path */}

      <Switch>
        <Route exact path={`${match.path}${routes.cast}`} component={Cast} />
        <Route
          exact
          path={`${match.path}${routes.reviews}`}
          component={Reviews}
        />
      </Switch>

      {isLoading && <Loader />}
    </>
  );
};

MovieDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MovieDetailsPage;

// Вариант на классах

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import GoBackButton from '../../components/GoBackButton';
// import Movie from '../../components/Movie';
// import MovieNavigation from '../../components/MovieNavigation';
// import Cast from '../../components/Cast';
// import Reviews from '../../components/Reviews';
// import Loader from '../../components/Loader';
// import { Route, Switch } from 'react-router-dom';

// import routes from '../../routes';
// import api from '../../services/api';

// class MovieDetailsPage extends Component {
//   state = {
//     movie: null,
//     isLoading: false,
//     error: null,
//   };

//   // Запрос за фильмом при маунте
//   async componentDidMount() {
//     const { movieId } = this.props.match.params; // Получаем id фильма из match.params

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const result = await api.fetchMovieById(movieId);

//       this.setState({
//         movie: result,
//         error: null,
//       });
//     } catch (error) {
//       console.error('Smth wrong with trends movie on movie page', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   // Метод для кнопки "Назад"
//   handleGoBack = () => {
//     const { location, history } = this.props; // Берёт из приходящих пропсов обьект текущего пути и историю

//     history.push(location?.state?.from || routes.home); // При клике пушит в историю новый лист + проверяет и кидает на главную
//   };

//   render() {
//     const { movie, isLoading } = this.state;
//     const { match, location } = this.props;

//     return (
//       <>
//         <GoBackButton onBack={this.handleGoBack} />

//         {movie && <Movie movie={movie} />}

//         {movie && <MovieNavigation match={match} location={location} />}

//         {/* Роутинг на основе match.path */}

//         <Switch>
//           <Route exact path={`${match.path}${routes.cast}`} component={Cast} />
//           <Route
//             exact
//             path={`${match.path}${routes.reviews}`}
//             component={Reviews}
//           />
//         </Switch>

//         {isLoading && <Loader />}
//       </>
//     );
//   }
// }

// MovieDetailsPage.propTypes = {
//   match: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,
// };

// export default MovieDetailsPage;
