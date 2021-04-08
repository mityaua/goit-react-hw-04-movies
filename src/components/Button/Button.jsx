import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ onClick }) => (
  <div className={styles['Button-wrapper']}>
    <button type="button" className={styles.Button} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
