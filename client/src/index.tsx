import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import UseScrollTop from "./hooks/useScrollTop";
import reportWebVitals from "./reportWebVitals";
import { createUploadLink } from "apollo-upload-client";
import { showFooterValue } from "./graphql/cache/cache";
import { Images } from "./generated/graphql";

const link = createUploadLink({
	uri:
		process.env.NODE_ENV === "production"
			? process.env.GRAPHQL_URL
			: process.env.REACT_APP_GRAPHQL_URL,
	credentials: "include"
});

const client = new ApolloClient({
	link: (link as unknown) as ApolloLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					showFooter: {
						read() {
							return showFooterValue();
						}
					},
					getAllImages: {
						keyArgs: ["limit"],
						merge(existing: Images | undefined, incoming: Images): Images {
							return {
								...incoming,
								images: [...(existing?.images || []), ...incoming.images]
							};
						}
					},
					getUserImages: {
						keyArgs: ["userId"],
						merge(existing: Images | undefined, incoming: Images): Images {
							return {
								...incoming,
								images: [...(existing?.images || []), ...incoming.images]
							};
						}
					},
					me: {
						merge(_, incoming) {
							return incoming;
						}
					},
					getUser: {
						merge(_, incoming) {
							return incoming;
						}
					}
				}
			}
		}
	}),
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
