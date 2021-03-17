import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Common from "./Common";

const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));

const UnauthenticatedApp = () => (
	<Switch>
		<Route exact path="/" component={Signin} />
		<Route exact path="/accounts/emailsignup" component={Signup} />
		<Common />
		<Route exact path="*" component={ErrorPage} />
	</Switch>
);

export default UnauthenticatedApp;
