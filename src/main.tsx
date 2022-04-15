import React from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";

const root = document.getElementById("root");
root &&
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
