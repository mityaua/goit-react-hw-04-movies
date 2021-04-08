import { Link } from 'react-router-dom';

// Пересмотреть формирование урла для Link?
const MovieList = ({ movies }) => (
  <ul>
    {movies.map(({ id, title }) => (
      <li key={id}>
        <Link to={`/movies/${id}`}>{title}</Link>
      </li>
    ))}
  </ul>
);

export default MovieList;
