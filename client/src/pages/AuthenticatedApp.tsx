import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
const Home = lazy(() => import('./Home'));
const NotFound = lazy(() => import('./NotFound'));

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default AuthenticatedApp;
