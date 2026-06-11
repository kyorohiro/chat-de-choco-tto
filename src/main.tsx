import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { DialogProvider } from "./useDialog";

const rootElement = document.querySelector<HTMLDivElement>("#app");

if (!rootElement) {
  throw new Error("#app not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
);
