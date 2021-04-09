import { Link, withRouter } from 'react-router-dom';
import MoviePreview from '../MoviePreview';

import styles from './MovieList.module.scss';

// Пересмотреть формирование урла для Link?
const MovieList = ({ movies, location }) => (
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

export default withRouter(MovieList);
