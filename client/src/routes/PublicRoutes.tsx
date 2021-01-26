import { lazy } from 'react';
import { Route } from 'react-router-dom';
const Profile = lazy(() => import('../pages/Profile'));

const PublicRoutes = () => {
  return <Route exact path='/:username' component={Profile} />;
};

export default PublicRoutes;
