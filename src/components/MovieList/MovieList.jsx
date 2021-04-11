import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MoviePreview from '../MoviePreview';

import routes from '../../routes';
import styles from './MovieList.module.scss';

// Комопнент списка фильмов, принимает фильмы и location от withRouter
const MovieList = ({ movies, location }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path, vote_average }) => (
        <li key={id} className={styles.item}>
          <Link
            to={{
              pathname: `${routes.movies}/${id}`, // Заменяем стандартный путь в to
              state: { from: location }, // Передает данные из текущего маршрута в следующий
            }}
            className={styles.link}
          >
            <MoviePreview
              title={title}
              poster={poster_path}
              vote={vote_average}
            />
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
