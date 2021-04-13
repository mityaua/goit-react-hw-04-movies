// Вариант на хуках
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Review from '../Review';
import Loader from '../Loader';
import Message from '../Message';

import api from '../../services/api';
import styles from './Reviews.module.scss';

// Компонент списка обзоров
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const match = useRouteMatch();

  // Срабатывает при маунте
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Запрос за обзорами
  const fetchData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const { results } = await api.fetchReviews(movieId);
      setReviews(results);
    } catch (error) {
      console.error('Smth wrong with fetch reviews on movie page', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id} className={styles.item}>
                <Review author={author} content={content} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
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

Reviews.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Reviews;

// Вариант на классах

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Review from '../Review';
// import Loader from '../Loader';

// import api from '../../services/api';
// import styles from './Reviews.module.scss';

// class Reviews extends Component {
//   state = {
//     reviews: [],
//     isLoading: false,
//     error: null,
//   };

//   async componentDidMount() {
//     const { movieId } = this.props.match.params; // Получаем id фильма из match.params

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const { results } = await api.fetchReviews(movieId);

//       this.setState({
//         reviews: [...results],
//         error: null,
//       });
//     } catch (error) {
//       console.error('Smth wrong with fetch reviews on movie page', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   render() {
//     const { reviews, isLoading } = this.state;

//     return (
//       <div>
//         {isLoading && <Loader />}

//         {reviews.length > 0 ? (
//           <ul className={styles.list}>
//             {reviews.map(({ id, author, content }) => {
//               return (
//                 <li key={id} className={styles.item}>
//                   <Review author={author} content={content} />
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>We don't have any reviews for this movie</p>
//         )}
//       </div>
//     );
//   }
// }

// Reviews.propTypes = {
//   match: PropTypes.object.isRequired,
// };

// export default Reviews;
