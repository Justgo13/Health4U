import React, { useReducer } from "react";
import { createCookie, CART_COUNT, CART_ITEMS } from "../cookies/cookies";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productName = action.productName;
      const cartItems = [...state.cartItems];

      if (cartItems === []) {
        return state;
      }

      const productEntry = cartItems.find(
        (item) => item.productName === productName
      );

      if (productEntry === undefined) {
        cartItems.push({ productName, cartCount: 1 });
      } else {
        const productIndex = cartItems.indexOf(productEntry);
        cartItems[productIndex].cartCount += 1;
      }

      // create cookies for storing cart information
      createCookie(CART_COUNT, cartItems.length);
      createCookie(CART_ITEMS, cartItems);

      return {
        ...state,
        shoppingCartItemCount: cartItems.length,
        cartItems,
      };
    default:
      return state;
  }
};

export const CartReducer = (initCartCount, initCartItems) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    shoppingCartItemCount: initCartCount,
    cartItems: initCartItems,
  });

  const addToCartHandler = (productName) => {
    dispatch({
      type: "ADD_TO_CART",
      productName,
    });
  };

  return { cartState, addToCartHandler };
};
