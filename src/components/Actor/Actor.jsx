import PropTypes from 'prop-types';

import styles from './Actor.module.scss';
import placeholder from '../../assets/images/placeholder.png';

const Actor = ({ photo, name, character }) => {
  return (
    <div>
      <div className={styles.Thumb}>
        {photo ? (
          <img src={`https://image.tmdb.org/t/p/w300${photo}`} alt={name} />
        ) : (
          <img src={placeholder} alt={name} />
        )}
      </div>
      <p className={styles.Name}>{name}</p>
      <p>
        <span>Character: </span>
        <b>{character}</b>
      </p>
    </div>
  );
};

Actor.dedaultProps = {
  photo: placeholder,
};

Actor.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Actor;
