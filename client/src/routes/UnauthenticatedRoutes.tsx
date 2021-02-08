import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Tagged from "../pages/Tagged";

const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));
const Signin = lazy(() => import("../pages/Signin"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const UnauthenticatedApp = () => {
	return (
		<Switch>
			<Route exact path="/" component={Signin} />
			<Route exact path="/:username" component={Profile} />;
			<Route exact path="/:username/tagged" component={Tagged} />;
			<Route exact path="/accounts/emailsignup" component={Signup} />
			<Route exact path="*" component={ErrorPage} />
		</Switch>
	);
};

export default UnauthenticatedApp;
