import React, { Component } from 'react';

import api from '../../services/api';

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const movieId = this.props.id;

    const { cast } = await api.fetchCast(movieId);

    this.setState({
      actors: cast,
    });

    console.log(cast);
  }

  render() {
    return (
      <ul>
        {this.state.actors.map(actor => {
          return (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : null
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>
                <span>Character: </span>
                {actor.character}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cast;
