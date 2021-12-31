import React from "react";
import { CartContext } from "../context/cart-context";

const CartProvider = props => {
  return (
    <CartContext.Provider
      value={{
        shoppingCartItemCount: 0,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
