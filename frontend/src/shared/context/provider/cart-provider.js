import React from "react";
import { CartContext } from "../cart-context";
import { CartReducer } from "../../reducers/cart-reducer";

const CartProvider = (props) => {
  const { cartState, addToCartHandler } = CartReducer(0, []);

  const shoppingCartItemCount = cartState.shoppingCartItemCount;
  const cartItems = cartState.cartItems;
  return (
    <CartContext.Provider
      value={{
        shoppingCartItemCount,
        cartItems,
        onAddToCart: addToCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
