import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";

import QuantityProvider from "./shared/context/provider/quantity-provider";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <QuantityProvider>
        <App />
      </QuantityProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
