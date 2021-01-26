import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

const Signup = lazy(() => import('../pages/Signup'));
const Signin = lazy(() => import('../pages/Signin'));
const NotFound = lazy(() => import('../pages/NotFound'));

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={Signin} />
      <PublicRoutes />
      <Route exact path='/accounts/emailsignup' component={Signup} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default UnauthenticatedApp;
