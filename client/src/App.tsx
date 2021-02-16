import React, { Fragment, lazy, Suspense } from "react";
import { useMeQuery } from "./generated/graphql";
import { createGlobalStyle } from "styled-components";
import ErrorBoundary from "./pages/ErrorBoundary";
import LoadingFullScreen from "./components/Common/LoadingFullScreen";

const AuthenticatedApp = lazy(() => import("./routes/AuthenticatedRoutes"));
const UnauthenticatedApp = lazy(() => import("./routes/UnauthenticatedRoutes"));

const GlobalStyle = createGlobalStyle`
  :root{
    --backgroudColor: #FAFAFA;
    --borderColor: #DBDBDB;
    --borderDarkColor: #A8A8A8;
    --textColorGray: #8e8e8e;
    --textColorDarkGray: #262626;
    --buttonLightBlue: #0095f6;
    --linkColor: #385185;
    --linkColorTwo: #00376b;
    --textErrorColor: #ed4956;
    --textColorGreen: #37bf6e
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  };

  *:focus {
    outline: none;
  };

  html {
    position: relative;
    overflow-y: auto;
  }; 


  body, button, input, textarea {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: var(--backgroudColor);
    color: #262626;
    font-size: 14px;
    line-height: 18px;
  };

  a, a:visited {
    text-decoration: none;
  }
`;

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
