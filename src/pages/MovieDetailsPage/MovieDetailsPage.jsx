import React, { Component } from 'react';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
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
    actors: [],
    reviews: [],
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    // Нужна оптимизация промисов через all или race?
    const movie = await api.fetchMovieById(movieId);
    const { cast } = await api.fetchCast(movieId);
    const { results } = await api.fetchReviews(movieId);

    this.setState({
      ...movie,
      actors: cast,
      reviews: results,
      error: null,
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
      actors,
      reviews,
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

        {/* Роутинг на основе шаблона match.path */}
        <Switch>
          <Route
            exact
            path={`${match.path}/cast/`}
            render={props => {
              return actors.length > 0 ? (
                <Cast {...props} cast={actors} />
              ) : (
                <p>There is no information about the actors.</p>
              );
            }}
          />
          <Route
            exact
            path={`${match.path}/reviews/`}
            render={props => {
              return reviews.length > 0 ? (
                <Reviews {...props} reviews={reviews} />
              ) : (
                <p>We dont have any reviews for this movie.</p>
              );
            }}
          />
        </Switch>
      </article>
    );
  }
}

export default MovieDetailsPage;
