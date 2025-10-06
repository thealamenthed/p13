import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index";
import "./styles/main.css";

// Activer les mocks MSW en dev (optionnel)
if (import.meta.env.DEV) {
  const {worker} = await import("./mocks/browser");
  await worker.start({serviceWorker: {url: "/mockServiceWorker.js"}});
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
