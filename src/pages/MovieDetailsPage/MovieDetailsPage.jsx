import React, { Component } from 'react';
import Movie from '../../components/Movie';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import Loader from '../../components/Loader';
import { NavLink, Route, Switch } from 'react-router-dom';

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

  render() {
    const { movie, isLoading } = this.state;
    const { match } = this.props;

    return (
      <>
        {movie && <Movie movie={movie} />}

        {/* Меню актёров и обзоров */}
        <p>Additional information:</p>

        <ul>
          <li>
            <NavLink to={`${match.url}/cast/`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/reviews/`}>Reviews</NavLink>
          </li>
        </ul>

        {isLoading && <Loader />}

        {/* Роутинг на основе шаблона match.path */}
        <Switch>
          <Route exact path={`${match.path}/cast/`} component={Cast} />
          <Route exact path={`${match.path}/reviews/`} component={Reviews} />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
