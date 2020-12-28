import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './App.style';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AuthPrivateRoute from './routes/AuthPrivateRoute';
import { MeQuery, useMeQuery } from './generated/graphql';
import ErrorBoundary from './pages/ErrorBoundary';
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { data, loading } = useMeQuery();
  const [meData, setMeData] = useState<MeQuery | undefined>();
  const [meLoading, setMeLoadingLoading] = useState<boolean>();

  useEffect(() => {
    setMeData(data);
    setMeLoadingLoading(loading);
  }, [data, loading]);

  return (
    <Fragment>
      <GlobalStyle />
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading</h1>}>
          <Switch>
            <AuthPrivateRoute
              exact
              path='/accounts/emailsignup'
              Component={Signup}
              data={meData}
              loading={meLoading}
            />
            <AuthPrivateRoute
              exact
              path='/accounts/login'
              Component={Signin}
              data={meData}
              loading={meLoading}
            />
            <Route exact path='/' component={Home} />
            <Route exact path='*' component={NotFound} />
            {/*<Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/success' component={Success} />*/}
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
};

export default App;
