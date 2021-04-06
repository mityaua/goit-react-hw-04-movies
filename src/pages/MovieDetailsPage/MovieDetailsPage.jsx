import React, { Component } from 'react';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import { NavLink, Route, Switch } from 'react-router-dom';

import api from '../../services/api';

class MovieDetailsPage extends Component {
  state = {
    title: '',
    release_date: '',
    overview: '',
    genres: [],
    vote_average: null,
    poster_path: '',
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const result = await api.fetchMovieById(movieId);

    this.setState({
      ...result,
    });
  }

  render() {
    const {
      title,
      release_date,
      vote_average,
      poster_path,
      overview,
      genres,
    } = this.state;

    const { match } = this.props;

    return (
      <>
        <h1>
          {title} ({release_date})
        </h1>

        <span>User score: {vote_average * 10}%</span>

        <p>Overview: {overview}</p>

        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : null
          }
          alt={title}
        />

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

        <span>Additional information:</span>
        <ul>
          <li>
            <NavLink to={`${match.url}/cast/`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/reviews/`}>Reviews</NavLink>
          </li>
        </ul>

        <Switch>
          <Route
            exact
            path={`${match.path}/cast/`}
            render={props => {
              const { movieId } = match.params;
              return <Cast {...props} id={movieId} />;
            }}
          />
          <Route
            exact
            path={`${match.path}/reviews/`}
            render={props => {
              const { movieId } = match.params;
              return <Reviews {...props} id={movieId} />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
