import { useRouteMatch, useLocation, withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from '../../routes';
import styles from './MovieNavigation.module.scss';

// Меню актёров и обзоров
const MovieNavigation = () => {
  const location = useLocation();
  const match = useRouteMatch();

  return (
    <div>
      <b>Additional information:</b>

      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to={{
              pathname: `${match.url}${routes.cast}`, // Формирует путь для ссылки
              state: { ...location.state }, // Передает полученый стейт при переходе на актёров
            }}
            className={styles.link}
            activeClassName={styles['link--active']}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${match.url}${routes.reviews}`, // Формирует путь для ссылки
              state: { ...location.state }, // Передает полученый стейт при переходе на обзоры
            }}
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
  location: PropTypes.object.isRequired,
};

export default withRouter(MovieNavigation);
