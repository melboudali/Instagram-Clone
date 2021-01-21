import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { MeQuery } from '../generated/graphql';

type SignRoutesProps = {
  exact: boolean;
  path: string;
  Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const SignRoutes = ({ Component, data, loading, ...rest }: SignRoutesProps) => (
  <Route
    {...rest}
    render={props =>
      data && data?.me && !loading ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

export default SignRoutes;
