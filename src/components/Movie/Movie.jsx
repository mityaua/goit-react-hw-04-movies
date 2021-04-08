import styles from './Movie.module.scss';

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
      {title && (
        <h1 className={styles.Title}>
          {title} ({release_date.substring(0, 4)})
        </h1>
      )}

      <p className={styles.Score}>
        <b>User score:</b> <span>{vote_average * 10}%</span>
      </p>

      <p className={styles.Overview}>
        <b>Overview:</b> <span>{overview}</span>
      </p>

      {poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className={styles.Poster}
        />
      )}

      <span className={styles.GenresTitle}>Genres:</span>
      <ul className={styles.GenresList}>
        {genres.map(({ id, name }) => (
          <li key={id} className={styles.GenresItem}>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Movie;
