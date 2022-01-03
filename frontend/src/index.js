import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";

import QuantityProvider from "./shared/context/provider/quantity-provider";

ReactDOM.render(
  <React.StrictMode>
    <QuantityProvider>
      <App />
    </QuantityProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
