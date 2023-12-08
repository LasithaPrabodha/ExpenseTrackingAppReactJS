import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {  HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./Theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
