import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./store/search-context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <SearchContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SearchContextProvider>,
  document.getElementById("root")
);
