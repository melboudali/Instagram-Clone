import { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));
const Profile = lazy(() => import("../pages/Profile"));
const Tagged = lazy(() => import("../pages/Tagged"));
const Image = lazy(() => import("../pages/Image"));
const Static = lazy(() => import("../pages/others/Static"));

const UnauthenticatedApp = () => (
	<Switch>
		<Route exact path="/" component={Signin} />
		<Route exact path="/accounts/emailsignup" component={Signup} />
		<Route exact path="/p/:imageId" component={Image} />
		<Route exact path="/:username" component={Profile} />
		<Route exact path="/:username/tagged" component={Tagged} />
		<Route exact path="/page/:pageName" component={Static} />
		<Route exact path="*" component={ErrorPage} />
	</Switch>
);

export default UnauthenticatedApp;
