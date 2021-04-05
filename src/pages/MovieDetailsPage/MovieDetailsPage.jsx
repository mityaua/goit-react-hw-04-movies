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
    popularity: null,
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
      popularity,
      poster_path,
      overview,
      genres,
    } = this.state;

    const { match } = this.props;

    return (
      <>
        <h1>
          {title} | ({release_date})
        </h1>

        <ul>
          {genres.map(genre => {
            return (
              <li key={genre.id}>
                <span>{genre.name}</span>
              </li>
            );
          })}
        </ul>

        <span>{popularity}</span>

        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : null
          }
          alt={title}
        />

        <p>{overview}</p>

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
              return <Cast {...props} id={match.params.movieId} />;
            }}
          />
          <Route
            exact
            path={`${match.path}/reviews/`}
            render={props => {
              return <Reviews {...props} id={match.params.movieId} />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
