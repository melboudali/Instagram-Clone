import { Route, Redirect } from 'react-router-dom';
import { MeQuery } from '../generated/graphql';

type AuthPrivateRouteProps = {
  exact: boolean;
  path: string;
  Component: React.ComponentType<any>;
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const AuthPrivateRoute = ({ Component, data, loading, ...rest }: AuthPrivateRouteProps) => (
  <Route
    {...rest}
    render={props =>
      data?.me && !loading ? (
        <Component data={data} loading={loading} {...props} />
      ) : (
        <Redirect to='/accounts/login' />
      )
    }
  />
);

export default AuthPrivateRoute;
