import { NavLink } from 'react-router-dom';
import routes from '../../routes';

import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.Container}>
    <ul className={styles.NavList}>
      <li className={styles.NavItem}>
        <NavLink
          exact
          to={routes.home}
          className={styles.Navlink}
          activeClassName={styles['Navlink--active']}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.movies}
          className={styles.Navlink}
          activeClassName={styles['Navlink--active']}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
