import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = '249f222afb1002186f4d88b2b5418b55';

// Фетч трендов
const fetchTrends = async () => {
  const { data } = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  const trends = data.results;

  return trends;
};

// Фетч по поиску
const fetchMoviesBySearch = async (searchQuery, currentPage) => {
  const { data } = await axios.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}`,
  );

  const results = data.results;

  return results;
};

// eslint-disable-next-line
export default { fetchTrends, fetchMoviesBySearch };
