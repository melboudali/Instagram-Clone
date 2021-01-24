import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Signup = lazy(() => import('./Signup'));
const Signin = lazy(() => import('./Signin'));
const NotFound = lazy(() => import('./NotFound'));

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={Signin} />
      <Route exact path='/accounts/emailsignup' component={Signup} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default UnauthenticatedApp;
