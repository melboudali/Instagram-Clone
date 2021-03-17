import { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));
const Tagged = lazy(() => import("../pages/Tagged"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const UnauthenticatedApp = () => (
	<Switch>
		<Route exact path="/" component={Signin} />
		<Route exact path="/accounts/emailsignup" component={Signup} />
		<Route exact path="/:username" component={Profile} />
		<Route exact path="/:username/tagged" component={Tagged} />
		<Route exact path="*" component={ErrorPage} />
	</Switch>
);

export default UnauthenticatedApp;
