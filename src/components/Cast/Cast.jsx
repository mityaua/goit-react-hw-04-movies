import { Component } from 'react';
import api from '../../services/api';

// import placeholder from '../../assets/images/placeholder.png';

class Cast extends Component {
  state = {
    actors: [],
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    try {
      const { cast } = await api.fetchCast(movieId);
      console.log(cast);

      this.setState({
        actors: [...cast],
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with fetch cast on movie page', error);
      this.setState({ error });
    }
  }

  render() {
    const { actors } = this.state;

    return actors.length > 0 ? (
      <ul>
        {actors.map(actor => {
          return (
            <li key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : null}
              <p>{actor.name}</p>
              <p>
                <span>Character: </span>
                {actor.character}
              </p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>There is no information about actors for this movie.</p>
    );
  }
}

export default Cast;
