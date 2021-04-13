// Вариант на хуках
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Actor from '../Actor';
import Loader from '../Loader';
import Message from '../Message';

import api from '../../services/api';
import styles from './Cast.module.scss';

// Компонент списка актёров
const Cast = () => {
  const [actors, setActors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const match = useRouteMatch();

  // Срабатывает при маунте
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Запрос за актёрами
  const fetchData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const { cast } = await api.fetchCast(movieId);
      setActors(cast);
    } catch (error) {
      console.error('Smth wrong with fetch cast on movie page', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {actors.length > 0 ? (
        <ul className={styles.list}>
          {actors.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id} className={styles.item}>
                <Actor photo={profile_path} name={name} character={character} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There is no information about actors for this movie.</p>
      )}

      {error && (
        <Message>
          <h2>
            The service is temporarily unavailable. Please try again later.
          </h2>
        </Message>
      )}
    </div>
  );
};

Cast.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Cast;

// Вариант на классах

// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import Actor from '../Actor';
// import Loader from '../Loader';

// import api from '../../services/api';

// import styles from './Cast.module.scss';

// class Cast extends Component {
//   state = {
//     actors: [],
//     isLoading: false,
//     error: null,
//   };

//   async componentDidMount() {
//     const { movieId } = this.props.match.params; // Получаем id фильма из match.params

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const { cast } = await api.fetchCast(movieId);

//       this.setState({
//         actors: [...cast],
//         error: null,
//       });
//     } catch (error) {
//       console.error('Smth wrong with fetch cast on movie page', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   render() {
//     const { actors, isLoading } = this.state;

//     return (
//       <div>
//         {isLoading && <Loader />}

//         {actors.length > 0 ? (
//           <ul className={styles.list}>
//             {actors.map(({ id, profile_path, name, character }) => {
//               return (
//                 <li key={id} className={styles.item}>
//                   <Actor
//                     photo={profile_path}
//                     name={name}
//                     character={character}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>There is no information about actors for this movie.</p>
//         )}
//       </div>
//     );
//   }
// }

// Cast.propTypes = {
//   match: PropTypes.object.isRequired,
// };

// export default Cast;
