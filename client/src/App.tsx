import React, { Fragment, Suspense } from "react";
import { createGlobalStyle } from "styled-components";
import ErrorBoundary from "./pages/error/ErrorBoundary";
import LoadingFullScreen from "./pages/others/LoadingFullScreen";
import AppContainer from "./containers/AppContainer";

const GlobalStyle = createGlobalStyle`
  :root{
    --whiteColor: #fff;
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
    color: var(--textColorDarkGray);
    font-size: 14px;
    line-height: 18px;
  };

  a, a:visited {
    text-decoration: none;
  }

  button{
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
	  padding: 0;
  }
`;

const App = () => {
	return (
		<Fragment>
			<React.StrictMode>
				<GlobalStyle />
				<ErrorBoundary>
					<Suspense fallback={<LoadingFullScreen />}>
						<AppContainer />
					</Suspense>
				</ErrorBoundary>
			</React.StrictMode>
		</Fragment>
	);
};

export default App;
