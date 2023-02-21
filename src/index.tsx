import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "modern-normalize/modern-normalize.css";
import "./index.scss";

import App from "./components/app/app";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
