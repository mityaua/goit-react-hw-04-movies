// Вариант на хуках
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import api from '../../services/api';

const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');

  // Срабатывает при маунте
  useEffect(() => {
    fetchData();
  }, []);

  // Запрос за трендами при маунте
  const fetchData = async () => {
    setLoading(true);

    try {
      const movies = await api.fetchTrends();

      setTrends(movies);
    } catch (error) {
      console.error('Smth wrong with homepage trends fetch', error);
      setError(error.message); // Почему не пишет?
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {trends ? (
        <MovieList movies={trends} />
      ) : (
        <Message>
          <h2>
            The service is temporarily unavailable. Please try again later.
          </h2>
        </Message>
      )}

      {isLoading && <Loader />}
    </main>
  );
};

export default HomePage;

// Вариант на классах

// import React, { Component } from 'react';
// import MovieList from '../../components/MovieList';
// import Message from '../../components/Message';
// import Loader from '../../components/Loader';
// import api from '../../services/api';

// class HomePage extends Component {
//   state = {
//     trends: [],
//     isLoading: false,
//     error: null,
//   };

//   // Запрос за трендами при маунте
//   async componentDidMount() {
//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const movies = await api.fetchTrends();

//       this.setState({
//         trends: movies,
//         error: null,
//       });
//     } catch (error) {
//       console.error('Smth wrong with homepage trends fetch', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   render() {
//     const { trends, isLoading } = this.state;

//     return (
//       <main>
//         {trends ? (
//           <MovieList movies={trends} />
//         ) : (
//           <Message>
//             <h2>
//               The service is temporarily unavailable. Please try again later.
//             </h2>
//           </Message>
//         )}

//         {isLoading && <Loader />}
//       </main>
//     );
//   }
// }

// export default HomePage;
