import PropTypes from 'prop-types';
import styles from './LoadMoreButton.module.scss';

const LoadMoreButton = ({ onClick }) => (
  <div className={styles.Wrapper}>
    <button type="button" className={styles.LoadMoreButton} onClick={onClick}>
      Load more
    </button>
  </div>
);

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
