import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import store from "./store/bigPie";
import { Provider } from "react-redux";
import { getToken } from "./service/storageService";

axios.defaults.baseURL = "http://localhost:8081/api/v1";

axios.interceptors.request.use((config) => {
  const token = getToken();
// axios.defaults.baseURL = "http://localhost:8081/api/v1";
axios.defaults.baseURL = "https://finalproject-elishevasegal.onrender.com";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
