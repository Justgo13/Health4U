import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";

import CartProvider from "./shared/context/provider/cart-provider";
import QuantityProvider from "./shared/context/provider/quantity-provider";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <QuantityProvider>
        <App />
      </QuantityProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
