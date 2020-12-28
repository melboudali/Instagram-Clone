import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { MeQuery } from '../generated/graphql';

type AuthPrivateRouteProps = {
  exact: boolean;
  path: string;
  Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const AuthPrivateRoute = ({ Component, data, loading, ...rest }: AuthPrivateRouteProps) => (
  <Route
    {...rest}
    render={props => (data?.me && !loading ? <Redirect to='/' /> : <Component {...props} />)}
  />
);

export default AuthPrivateRoute;
