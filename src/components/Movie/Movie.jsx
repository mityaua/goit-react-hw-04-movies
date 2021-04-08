// import styles from './MoviePreview.module.scss';

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
    <article>
      {title && (
        <h1>
          {title} ({release_date.substring(0, 4)})
        </h1>
      )}

      <span>User score: {vote_average * 10}%</span>

      <p>Overview: {overview}</p>

      {poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
      )}

      <span>Genres:</span>
      <ul>
        {genres.map(({ id, name }) => (
          <li key={id}>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Movie;
