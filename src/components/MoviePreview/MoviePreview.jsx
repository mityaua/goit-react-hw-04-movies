import PropTypes from 'prop-types';

// import styles from './MoviePreview.modue.scss';

import placeholder from '../../assets/images/placeholder.png';

const MoviePreview = ({ title, poster }) => {
  return (
    <div>
      {poster ? (
        <img src={`https://image.tmdb.org/t/p/w300${poster}`} alt={title} />
      ) : (
        <img src={placeholder} alt={title} />
      )}

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
