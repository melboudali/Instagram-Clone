import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, RequestHandler } from '@apollo/client';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';
import reportWebVitals from './reportWebVitals';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
}) ;

const client = new ApolloClient({
  link: (link as unknown) as ApolloLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
