import PropTypes from 'prop-types';

import styles from './MoviePreview.module.scss';
import placeholder from '../../assets/images/placeholder.png';

// Компонент превью фильма в общем списке фильмов
const MoviePreview = ({ title, poster, vote }) => {
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : placeholder;
  const voteStyle = vote > 5 ? styles['vote--top'] : styles['vote--low'];

  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        <img
          src={posterUrl}
          alt={title}
          title={title}
          className={styles.poster}
        />
      </div>

      <p className={styles.text}>
        <span>{title}</span>
        {vote ? <b className={voteStyle}>{vote}</b> : null}
      </p>
    </div>
  );
};

MoviePreview.defaultProps = {
  poster: '',
  vote: null,
};

MoviePreview.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
  vote: PropTypes.number,
};

export default MoviePreview;
