import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Tagged from "../pages/Tagged";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/404"));

const AuthenticatedApp = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/:username" component={Profile} />;
			<Route exact path="/:username/tagged" component={Tagged} />;
			<Route exact path="*" component={NotFound} />
		</Switch>
	);
};

export default AuthenticatedApp;
