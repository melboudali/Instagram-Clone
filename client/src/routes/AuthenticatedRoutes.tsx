import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <PublicRoutes />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default AuthenticatedApp;
