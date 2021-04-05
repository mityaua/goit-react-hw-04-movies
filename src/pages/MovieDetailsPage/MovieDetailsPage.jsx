import React, { Component } from 'react';

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

    return (
      <>
        <h2>
          {title} | ({release_date})
        </h2>

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
      </>
    );
  }
}

export default MovieDetailsPage;
