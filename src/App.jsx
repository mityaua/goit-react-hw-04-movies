import { Route, NavLink, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import PageNotFound from './pages/PageNotFound';
import styles from './App.module.scss';

const App = () => (
  <>
    <ul>
      <li>
        <NavLink
          exact
          to="/"
          className={styles.Navlink}
          activeClassName={styles['Navlink--active']}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className={styles.Navlink}
          activeClassName={styles['Navlink--active']}
        >
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/other"
          className={styles.Navlink}
          activeClassName={styles['Navlink--active']}
        >
          Movie details
        </NavLink>
      </li>
    </ul>

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies" component={MoviesPage} />
      <Route path="/other" component={MovieDetailsPage} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default App;