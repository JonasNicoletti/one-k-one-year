import React from "react";
import useCookies from "react-cookie/es6/useCookies";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import LoginCallBack from "./login-callback/LoginCallback";
import Login from "./components/login/Login";
import Constants from "./utils/constants";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";

export default function App() {
  const [cookies] = useCookies([Constants.COOKIE_STRAVA_USER]);
  let routes = [
    <Route path="/loginCallback" component={LoginCallBack} key={1} />,
    <Route path="/demo" render={() => <Home isDemo />} key={2} />,
    <Route path="/" component={Login} key={3} />,
  ];
  if (cookies[Constants.COOKIE_STRAVA_USER]) {
    routes.unshift(<Route path="/login" component={Login} key={0} />);
    routes[3] = <Route path="/" component={Home} key={4} />;
  }
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
