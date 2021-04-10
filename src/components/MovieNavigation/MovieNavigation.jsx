import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from '../../routes';
import styles from './MovieNavigation.module.scss';

// Меню актёров и обзоров
const MovieNavigation = ({ match }) => {
  return (
    <div>
      <b>Additional information:</b>

      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to={`${match.url}${routes.cast}`}
            className={styles.link}
            activeClassName={styles['link--active']}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${match.url}${routes.reviews}`}
            className={styles.link}
            activeClassName={styles['link--active']}
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
