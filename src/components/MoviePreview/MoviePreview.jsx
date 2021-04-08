// import styles from './MoviePreview.modue.scss';

const MoviePreview = ({ title, poster }) => {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w300${poster}`} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default MoviePreview;
