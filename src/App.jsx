import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import PageNotFound from './pages/PageNotFound';

import AppBar from './components/AppBar';

import routes from './routes';

const App = () => (
  <>
    <AppBar />

    <Container>
      {/* Роутинг приложения */}
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.movies} component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Container>
  </>
);

export default App;
