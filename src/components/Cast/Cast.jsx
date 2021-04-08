import { Component } from 'react';
import Actor from '../Actor';
import Loader from '../Loader';
import api from '../../services/api';

import styles from './Cast.module.scss';

class Cast extends Component {
  state = {
    actors: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    this.setState({
      isLoading: true,
    });

    try {
      const { cast } = await api.fetchCast(movieId);

      this.setState({
        actors: [...cast],
        error: null,
      });
    } catch (error) {
      console.error('Smth wrong with fetch cast on movie page', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { actors, isLoading } = this.state;

    return (
      <div>
        {isLoading && <Loader />}

        {actors.length > 0 ? (
          <ul className={styles.List}>
            {actors.map(({ id, profile_path, name, character }) => {
              return (
                <li key={id} className={styles.Item}>
                  <Actor
                    photo={profile_path}
                    name={name}
                    character={character}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>There is no information about actors for this movie.</p>
        )}
      </div>
    );
  }
}

export default Cast;
