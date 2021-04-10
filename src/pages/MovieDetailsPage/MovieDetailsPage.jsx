import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoBackButton from '../../components/GoBackButton';
import Movie from '../../components/Movie';
import MovieNavigation from '../../components/MovieNavigation';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import Loader from '../../components/Loader';
import { Route, Switch } from 'react-router-dom';

import routes from '../../routes';
import api from '../../services/api';

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    isLoading: false,
    error: null,
  };

  // Запрос за фильмом при маунте
  async componentDidMount() {
    const { movieId } = this.props.match.params;

    this.setState({
      isLoading: true,
    });

    try {
      const result = await api.fetchMovieById(movieId);

      this.setState({
        movie: result,
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with trends movie on movie page', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  // Метод для кнопки "Назад" с проверкой на стейт истории и редиректом на главную
  handleGoBack = () => {
    const { location, history } = this.props;

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { movie, isLoading } = this.state;
    const { match } = this.props;

    return (
      <>
        <GoBackButton onBack={this.handleGoBack} />

        {movie && <Movie movie={movie} />}

        <MovieNavigation match={match} />

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
  }
}

MovieDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
