import PropTypes from 'prop-types';

import styles from './GoBackButton.module.scss';

const GoBackButton = ({ onBack }) => (
  <button type="button" className={styles.button} onClick={onBack}>
    Go back
  </button>
);

GoBackButton.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default GoBackButton;
