import React from "react";
import useCookies from "react-cookie/es6/useCookies";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import LoginCallBack from "./login-callback/LoginCallback";
import Login from "./login/Login";
import Constants from "./utils/constants";

export default function App() {
  const [cookies] = useCookies([Constants.COOKIE_STRAVA_USER]);
  let routes = [
    <Route path="/loginCallback" component={LoginCallBack} key={1}/>,
    <Route path="/" component={Login} key={2}/>,
  ];
  if (cookies[Constants.COOKIE_STRAVA_USER]) {
    routes = [
      <Route path="/login" component={Login} key={1} />,
      <Route path="/loginCallback" component={LoginCallBack} key={2}/>,
      <Route path="/" component={Home} key={3}/>,
    ];
  }
  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  );
}
