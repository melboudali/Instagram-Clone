import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
  connectToDevTools: true
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
