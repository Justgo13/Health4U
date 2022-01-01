import React, { useReducer } from "react";
import { createCookie, CART_COUNT, CART_ITEMS } from "../cookies/cookies";

const cartReducer = (state, action) => {
  let cartItems, productEntry, productName, productQuantity;
  switch (action.type) {
    case "ADD_TO_CART":
      productName = action.productName;
      cartItems = [...state.cartItems];
      productQuantity = action.productQuantity;

      if (cartItems === []) {
        return { ...state };
      }

      productEntry = cartItems.find((item) => item.productName === productName);

      if (productEntry === undefined) {
        cartItems.push({ productName, cartCount: productQuantity });
        console.log(cartItems);
      } else {
        const productIndex = cartItems.indexOf(productEntry);
        cartItems[productIndex].cartCount += productQuantity;
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

  const addToCartHandler = (productName, productQuantity) => {
    dispatch({
      type: "ADD_TO_CART",
      productName,
      productQuantity,
    });
  };

  return { cartState, addToCartHandler };
};
