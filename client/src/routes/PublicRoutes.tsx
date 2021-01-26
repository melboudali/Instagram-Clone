import { Route } from "react-router-dom";
import Profile from "../pages/Profile";

type PublicRoutesProps = { match: { isExact: boolean; path: string; url: string } };

const PublicRoutes = ({ match }: PublicRoutesProps) => {
  return (
    <>
      <Route
        exact
        path={`${match.path}/:username`}
        component={Profile}
      />
    </>
  );
};

export default PublicRoutes;
