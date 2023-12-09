import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./Theme";
import * as sw from "./service-worker-registration";
import { addMultipleExpensesAction } from "./redux/actions/expenseActions";
import { addMultipleCategoriesAction } from "./redux/actions/categoryActions";

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

sw.register((message: MessageEvent<any>) => {
  if (message.type === "expenses") {
    store.dispatch(addMultipleExpensesAction(message.data));
  } else {
    store.dispatch(addMultipleCategoriesAction(message.data.data));
  }
});
