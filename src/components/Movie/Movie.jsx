import PropTypes from 'prop-types';

import styles from './Movie.module.scss';
import placeholder from '../../assets/images/placeholder.png';

// Компонент полной карточки фильма
const Movie = ({ movie }) => {
  const {
    title,
    release_date,
    vote_average,
    poster_path,
    overview,
    genres,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : placeholder;
  const voteStyle =
    vote_average > 5 ? styles['vote--top'] : styles['vote--low'];

  return (
    <article className={styles.article}>
      <div className={styles.thumb}>
        <img
          src={posterUrl}
          alt={title}
          title={title}
          className={styles.poster}
        />
      </div>

      <div>
        {title && (
          <h1 className={styles.title}>
            {title}{' '}
            {release_date ? (
              <span>({release_date.substring(0, 4)})</span>
            ) : (
              <span>(N/A)</span>
            )}
          </h1>
        )}

        <p className={styles.score}>
          <b className={styles.label}>User score:</b>
          {vote_average ? <span>{vote_average * 10}%</span> : <span>N/A</span>}
          {vote_average ? <b className={voteStyle}>{vote_average}</b> : null}
        </p>

        <p className={styles.overview}>
          <b className={styles.label}>Overview:</b>
          {overview ? <span>{overview}</span> : <span>N/A</span>}
        </p>

        <b className={styles.label}>Genres:</b>

        {genres.length > 0 ? (
          <ul className={styles.genresList}>
            {genres.map(({ id, name }) => (
              <li key={id} className={styles.genresItem}>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>N/A</span>
        )}
      </div>
    </article>
  );
};

Movie.defaultProps = {
  movie: PropTypes.shape({
    release_date: '',
    vote_average: 0,
    poster_path: placeholder,
    overview: '',
    genres: [],
  }),
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

export default Movie;
