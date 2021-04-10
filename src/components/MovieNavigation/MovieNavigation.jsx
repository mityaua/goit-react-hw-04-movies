import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MovieNavigation.module.scss';

// Меню актёров и обзоров
const MovieNavigation = ({ match }) => {
  return (
    <div>
      <b>Additional information:</b>

      <ul className={styles.List}>
        <li className={styles.Item}>
          <NavLink
            to={`${match.url}/cast/`}
            className={styles.Link}
            activeClassName={styles['Link--active']}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${match.url}/reviews/`}
            className={styles.Link}
            activeClassName={styles['Link--active']}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

MovieNavigation.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MovieNavigation;
