import React from "react";
import ReactDOM from "react-dom/client";
import { setupWorker } from "msw/browser";
import App from "./app";
import "./index.css";

import { handlers } from "./api/handlers";


async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const worker = setupWorker(...handlers);

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>))
