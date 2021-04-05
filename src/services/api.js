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
    `search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}&language=en-US`,
  );

  const results = data.results;

  return results;
};

// Фетч фильма по id
const fetchMovieById = async id => {
  const { data } = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );

  return data;
};

// Фетч актёров для фильма
const fetchCast = async id => {
  const { data } = await axios.get(
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  );

  return data;
};

// Фетч отзывов на фильм
const fetchReviews = async id => {
  const { data } = await axios.get(
    `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );

  return data;
};

// eslint-disable-next-line
export default {
  fetchTrends,
  fetchMoviesBySearch,
  fetchMovieById,
  fetchCast,
  fetchReviews,
};
