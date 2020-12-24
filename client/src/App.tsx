// import { useEffect, useCallback, lazy, Suspense } from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { useRegisterMutation } from './generated/graphql';
import { GlobalStyle } from './App.style';
import Home from './pages/Home';
import ErrorBoundary from './pages/ErrorBoundary';
// import AuthPrivateRoute from './routes/AuthPrivateRoute';
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  // const [register] = useRegisterMutation();

  // const response = useCallback(
  //   async () =>
  //     await register({
  //       variables: {
  //         registerInputs: {
  //           userName: 'fromReact6',
  //           email: 'fromReact@fromReact6',
  //           password: 'fromReact6',
  //           fullName: 'fromReact6'
  //         }
  //       }
  //     }),
  //   [register]
  // );

  // useEffect(() => {
  //   response().then(({ data }) => {
  //     if (data?.register.errors) {
  //       console.log({
  //         registred: false,
  //         error: {
  //           field: data?.register.errors[0].field,
  //           message: data?.register.errors[0].message
  //         }
  //       });
  //     } else if (data?.register.user) {
  //       console.log({ registred: true, user: data.register.user });
  //     }
  //   });
  // }, [response]);

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
