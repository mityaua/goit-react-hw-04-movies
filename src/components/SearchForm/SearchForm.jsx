import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.scss';

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

    if (!query) return;

    onSearch(query);

    resetForm();
  };

  // Сбрасывает поле после отправки
  const resetForm = () => setQuery('');

  return (
    <div className={styles.SearchWrapp}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          name="query"
          value={query}
          onChange={handleSearchInput}
          autoComplete="off"
          placeholder="Search movies"
        />
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
