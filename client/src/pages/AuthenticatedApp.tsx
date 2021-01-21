import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MeQuery } from '../generated/graphql';
const Home = lazy(() => import('./Home'));
const NotFound = lazy(() => import('./NotFound'));

type AuthenticatedAppProps = { data: MeQuery; loading: boolean };

const AuthenticatedApp = ({ data, loading }: AuthenticatedAppProps) => {
  return (
    <Switch>
      <Route exact path='/' component={Home} data={data} loading={loading} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default AuthenticatedApp;
