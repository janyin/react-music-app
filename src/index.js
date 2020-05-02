import React from "react";
import ReactDOM from "react-dom";
import Route from "./router";
import { Provider } from "react-redux";
import store from "./store/store";
import './style/index.css'

ReactDOM.render(
  <Provider store={store}>
    <Route />
  </Provider>,
  document.getElementById("root")
);
