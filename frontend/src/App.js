import React, {useState, useEffect} from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import client from './apolloClient'
import Nav from "./components/Nav";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"))
  
  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token])
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Redirect from="/" to="/signup" exact />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}
