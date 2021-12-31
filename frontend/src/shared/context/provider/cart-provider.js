import React, { useState, useCallback } from "react";
import { CartContext } from "../cart-context";
import { CartReducer } from "../../reducers/cart-reducer";

const CartProvider = (props) => {
  const { cartState, addToCartHandler } = CartReducer(0, []);

  const shoppingCartItemCount = cartState.shoppingCartItemCount;

  return (
    <CartContext.Provider
      value={{
        shoppingCartItemCount,
        onAddToCart: addToCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
