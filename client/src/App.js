import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./Pages/Home.js";
import LoginSignup from "./Pages/LoginSignup.js";
import Profile from "./Pages/Profile";
import Arena from "./Pages/Arena.js";
import TitleNav from "./components/TitleNav";
import Footer from "./components/Footer";


import {
  createHttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink= createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({

  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Router>
            <TitleNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/LoginSignup" element={<LoginSignup />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Arena" element={<Arena />} />
            </Routes>
            <Footer />
          </Router>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
