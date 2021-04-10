import { NavLink } from 'react-router-dom';
import routes from '../../routes';

import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.container}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink
          exact
          to={routes.home}
          className={styles.link}
          activeClassName={styles['link--active']}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.movies}
          className={styles.link}
          activeClassName={styles['link--active']}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
