import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import CookiesProvider from "react-cookie/es6/CookiesProvider";
import { Provider } from "react-redux";
import "fontsource-roboto";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
