import { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AuthenticatedApp = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/:username" component={Profile} />;
			<Route exact path="*" component={NotFound} />
		</Switch>
	);
};

export default AuthenticatedApp;
