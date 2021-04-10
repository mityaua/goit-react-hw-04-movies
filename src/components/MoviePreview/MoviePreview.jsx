import PropTypes from 'prop-types';

import styles from './MoviePreview.modue.scss';
import placeholder from '../../assets/images/placeholder.png';

// Компонент превью фильма в общем списке фильмов
const MoviePreview = ({ title, poster }) => {
  return (
    <div>
      <div className={styles.thumb}>
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            className={styles.poster}
          />
        ) : (
          <img src={placeholder} alt={title} className={styles.poster} />
        )}
      </div>

      <h3>{title}</h3>
    </div>
  );
};

MoviePreview.defaultProps = {
  poster: '',
};

MoviePreview.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

export default MoviePreview;
