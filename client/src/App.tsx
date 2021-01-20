import React, { Fragment, lazy, Suspense } from 'react';
import { useMeQuery } from './generated/graphql';
import { GlobalStyle } from './App.style';
import ErrorBoundary from './pages/ErrorBoundary';
import LoadingFullScreen from './components/layouts/LoadingFullScreen';
import { Switch, Route } from 'react-router-dom';
import AuthPrivateRoute from './routes/AuthPrivateRoute';
import SignRoutes from './routes/SignRoutes';

const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { data, loading } = useMeQuery();

  return (
    <Fragment>
      <React.StrictMode>
        <GlobalStyle />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFullScreen />}>
            <Switch>
              <AuthPrivateRoute exact path='/' Component={Home} data={data} loading={loading} />
              <SignRoutes
                exact
                path='/accounts/emailsignup'
                Component={Signup}
                data={data}
                loading={loading}
              />
              <SignRoutes
                exact
                path='/accounts/login'
                Component={Signin}
                data={data}
                loading={loading}
              />
              <Route exact path='*' component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </React.StrictMode>
    </Fragment>
  );
};

export default App;
