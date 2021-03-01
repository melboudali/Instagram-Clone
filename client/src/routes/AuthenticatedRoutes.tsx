import { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Edit = lazy(() => import("../pages/Edit"));
const Profile = lazy(() => import("../pages/Profile"));
const Tagged = lazy(() => import("../pages/Tagged"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const AuthenticatedApp = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/accounts/edit" component={Edit} />;
			<Route exact path="/:username" component={Profile} />;
			<Route exact path="/:username/tagged" component={Tagged} />;
			<Route exact path="*" component={ErrorPage} />
		</Switch>
	);
};

export default AuthenticatedApp;
