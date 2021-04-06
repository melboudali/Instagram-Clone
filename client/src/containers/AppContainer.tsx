import { lazy } from "react";
import { useMeQuery } from "../generated/graphql";

const LoadingFullScreen = lazy(() => import("../pages/others/LoadingFullScreen"));
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));
const AuthenticatedApp = lazy(() => import("../routes/AuthenticatedRoutes"));
const UnauthenticatedApp = lazy(() => import("../routes/UnauthenticatedRoutes"));

const AppContainer = () => {
	const { data, loading, error } = useMeQuery();

	if (loading) return <LoadingFullScreen />;

	if (!data || error) return <ErrorPage />;

	return <>{data.me ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};

export default AppContainer;
