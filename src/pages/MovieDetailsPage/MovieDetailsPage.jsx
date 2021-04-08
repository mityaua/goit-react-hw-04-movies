import React, { Component } from 'react';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import Loader from '../../components/Loader';
import { NavLink, Route, Switch } from 'react-router-dom';

import api from '../../services/api';

// import placeholder from '../../assets/images/placeholder.png';

class MovieDetailsPage extends Component {
  state = {
    title: '',
    release_date: '',
    overview: '',
    vote_average: 0,
    poster_path: '',
    genres: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    this.setState({
      isLoading: true,
    });

    try {
      const movie = await api.fetchMovieById(movieId);

      this.setState({
        ...movie,
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
    const {
      title,
      release_date,
      vote_average,
      poster_path,
      overview,
      genres,
      isLoading,
    } = this.state;

    const { match } = this.props;

    return (
      <article>
        {title && (
          <h1>
            {title} ({release_date.substring(0, 4)})
          </h1>
        )}

        <span>User score: {vote_average * 10}%</span>

        <p>Overview: {overview}</p>

        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
          />
        )}

        <span>Genres:</span>
        <ul>
          {genres.map(genre => {
            return (
              <li key={genre.id}>
                <span>{genre.name}</span>
              </li>
            );
          })}
        </ul>

        {/* Меню актёров и обзоров */}
        <span>Additional information:</span>
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
      </article>
    );
  }
}

export default MovieDetailsPage;
