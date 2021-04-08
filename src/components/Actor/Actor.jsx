// import styles from './Actor.module.scss';
import placeholder from '../../assets/images/placeholder.png';

const Actor = ({ photo, name, character }) => {
  return (
    <div>
      {photo ? (
        <img src={`https://image.tmdb.org/t/p/w300${photo}`} alt={name} />
      ) : (
        <img src={placeholder} alt={name} />
      )}
      <p>{name}</p>
      <p>
        <span>Character: </span>
        <b>{character}</b>
      </p>
    </div>
  );
};

export default Actor;
