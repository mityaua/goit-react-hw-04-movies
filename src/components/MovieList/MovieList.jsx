import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MoviePreview from '../MoviePreview';

import styles from './MovieList.module.scss';

// Комопнент списка фильмов, принимает фильмы и location от withRouter
const MovieList = ({ movies, location }) => {
  return (
    <ul className={styles.List}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.Item}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
            className={styles.Link}
          >
            <MoviePreview title={title} poster={poster_path} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
  location: PropTypes.object.isRequired,
};

export default withRouter(MovieList);
