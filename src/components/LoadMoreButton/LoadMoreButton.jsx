import PropTypes from 'prop-types';
import styles from './LoadMoreButton.module.scss';

const LoadMoreButton = ({ onClick }) => (
  <div className={styles.wapper}>
    <button type="button" className={styles.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
