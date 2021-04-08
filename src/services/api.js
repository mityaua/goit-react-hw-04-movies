import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = '249f222afb1002186f4d88b2b5418b55';

// Фетч трендов
const fetchTrends = async () => {
  try {
    const { data } = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
    const trends = data.results;

    return trends;
  } catch (error) {
    console.error('Smth wrong with fetch trends in api', error);
  }
};

// Фетч по поиску
const fetchMoviesBySearch = async (searchQuery, currentPage) => {
  try {
    const { data } = await axios.get(
      `search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}&language=en-US`,
    );

    const results = data.results;

    return results;
  } catch (error) {
    console.error('Smth wrong with fetch movie search in api', error);
  }
};

// Фетч фильма по id
const fetchMovieById = async id => {
  try {
    const { data } = await axios.get(
      `/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );

    return data;
  } catch (error) {
    console.error('Smth wrong with fetch movie id in api', error);
  }
};

// Фетч актёров для фильма
const fetchCast = async id => {
  try {
    const { data } = await axios.get(
      `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );

    return data;
  } catch (error) {
    console.error('Smth wrong with fetch cast in api', error);
  }
};

// Фетч отзывов на фильм
const fetchReviews = async id => {
  try {
    const { data } = await axios.get(
      `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    );

    return data;
  } catch (error) {
    console.error('Smth wrong with fetch reviews in api', error);
  }
};

// eslint-disable-next-line
export default {
  fetchTrends,
  fetchMoviesBySearch,
  fetchMovieById,
  fetchCast,
  fetchReviews,
};
