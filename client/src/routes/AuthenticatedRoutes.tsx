import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Common from "./Common";

const Home = lazy(() => import("../pages/Home"));
const Edit = lazy(() => import("../pages/settings/Edit"));
const ChangePassword = lazy(() => import("../pages/settings/ChangePassword"));
const PrivacyAndSecurity = lazy(() => import("../pages/settings/PrivacyAndSecurity"));
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));

const AuthenticatedApp = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/accounts/edit" component={Edit} />
		<Route exact path="/accounts/password/change" component={ChangePassword} />
		<Route exact path="/accounts/privacy_and_security" component={PrivacyAndSecurity} />
		<Common />
		<Route exact path="*" component={ErrorPage} />
	</Switch>
);

export default AuthenticatedApp;
