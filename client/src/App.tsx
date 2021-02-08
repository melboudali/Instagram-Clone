import React, { Fragment, lazy, Suspense } from "react";
import { useMeQuery } from "./generated/graphql";
import { GlobalStyle } from "./App.style";
import ErrorBoundary from "./pages/ErrorBoundary";
import LoadingFullScreen from "./components/Common/LoadingFullScreen";

const AuthenticatedApp = lazy(() => import("./routes/AuthenticatedRoutes"));
const UnauthenticatedApp = lazy(() => import("./routes/UnauthenticatedRoutes"));

const App = () => {
	const { data, loading } = useMeQuery();

	return (
		<Fragment>
			<React.StrictMode>
				<GlobalStyle />
				<ErrorBoundary>
					<Suspense fallback={<LoadingFullScreen />}>
						{loading ? (
							<LoadingFullScreen />
						) : data && data.me ? (
							<AuthenticatedApp />
						) : (
							<UnauthenticatedApp />
						)}
					</Suspense>
				</ErrorBoundary>
			</React.StrictMode>
		</Fragment>
	);
};

export default App;
