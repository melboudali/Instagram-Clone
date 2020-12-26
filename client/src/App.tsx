import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './App.style';
import Home from './pages/Home';
import ErrorBoundary from './pages/ErrorBoundary';
// import AuthPrivateRoute from './routes/AuthPrivateRoute';
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading</h1>}>
          <Switch>
            <Route exact path='/signin' component={Home} />
            <Route exact path='/' component={Home} />
            <Route exact path='*' component={NotFound} />
            {/* <AuthPrivateRoute exact path='/signin' component={SigninSignupPage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/success' component={Success} />*/}
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
