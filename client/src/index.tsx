import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import UseScrollTop from "./Hooks/useScrollTop";
import reportWebVitals from "./reportWebVitals";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
	uri: "http://localhost:5000/graphql",
	credentials: "include"
});

const client = new ApolloClient({
	link: (link as unknown) as ApolloLink,
	cache: new InMemoryCache(),
	connectToDevTools: true
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<UseScrollTop />
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
