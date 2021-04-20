import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import styles from './SearchForm.module.scss';
import 'react-toastify/dist/ReactToastify.min.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Наблюдает за инпутом и пишет значние в стейт
  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  // Наблюдает за отправкой и отдает значение во внешний компонент
  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      toast.info('Please write your request', {
        autoClose: 2000,
      });
      return;
    }

    onSearch(query);

    resetForm();
  };

  // Сбрасывает поле после отправки
  const resetForm = () => setQuery('');

  return (
    <div className={styles.wrapp}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" title="Go" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          name="query"
          value={query}
          onChange={handleSearchInput}
          autoComplete="off"
          placeholder="Search movies"
          required
        />
      </form>

      <ToastContainer />
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
