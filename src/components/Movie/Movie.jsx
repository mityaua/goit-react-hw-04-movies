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

  return (
    <article className={styles.Article}>
      <div className={styles.Thumb}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className={styles.Poster}
          />
        ) : (
          <img src={placeholder} alt={title} className={styles.Poster} />
        )}
      </div>

      <div>
        {title && (
          <h1 className={styles.Title}>
            {title}{' '}
            {release_date ? (
              <span>({release_date.substring(0, 4)})</span>
            ) : (
              <span>(N/A)</span>
            )}
          </h1>
        )}

        <p className={styles.Score}>
          <b className={styles.Label}>User score:</b>
          {vote_average ? <span>{vote_average * 10}%</span> : <span>N/A</span>}
        </p>

        <p className={styles.Overview}>
          <b className={styles.Label}>Overview:</b>
          {overview ? <span>{overview}</span> : <span>N/A</span>}
        </p>

        <b className={styles.Label}>Genres:</b>

        {genres.length > 0 ? (
          <ul className={styles.GenresList}>
            {genres.map(({ id, name }) => (
              <li key={id} className={styles.GenresItem}>
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
