import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";

import CartProvider from "./shared/context/provider/cart-provider";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider value={{ shoppingCartItemCount: 0 }}>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
