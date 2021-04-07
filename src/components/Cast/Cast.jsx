const Cast = ({ cast }) => {
  return (
    <ul>
      {cast.map(actor => {
        return (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : null
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>
              <span>Character: </span>
              {actor.character}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
