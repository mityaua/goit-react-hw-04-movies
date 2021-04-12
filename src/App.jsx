import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import AppFooter from './components/AppFooter';
import Loader from './components/Loader';

import routes from './routes';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const PageNotFound = lazy(() =>
  import('./pages/PageNotFound' /* webpackChunkName: "404-page" */),
);

const App = () => (
  <>
    <AppBar />

    <Container>
      {/* Роутинг приложения */}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Container>

    <AppFooter />
  </>
);

export default App;
