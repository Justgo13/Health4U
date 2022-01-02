import React, { useState, useEffect } from "react";
import { CartContext } from "../cart-context";
import { getCookie, createCookie, CART_COUNT, CART_ITEMS } from "../../cookies/cookies";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // initialize cookies once
    let cartItemCount = getCookie(CART_COUNT);
    let cartItems = getCookie(CART_ITEMS);

    cartItemCount === null
      ? createCookie(CART_COUNT, 0)
      : console.log("cart item count cookie exists");
    cartItems === null
      ? createCookie(CART_ITEMS, JSON.stringify([]))
      : console.log("cart items cookie exists");
  }, []);

  const addToCartHandler = ({
    productName,
    productImage,
    productQuantity,
    productPrice,
  }) => {
    const cartItems = [...JSON.parse(getCookie(CART_ITEMS))];
    /**
     * Cart items looks like
     * [
     *  {
     *    productName: "Mask",
     *    productImage: "someImage.png",
     *    productQuantity: 2,
     *    productPrice: 4.33
     *  },
     *  ...
     * ]
     */
    const productEntry = cartItems.find(
      (item) => item.productName === productName
    );

    if (!productEntry) {
      console.log(`Product ${productName} not found, adding new entry`);
      cartItems.push({
        productName,
        productImage,
        productQuantity,
        productPrice,
      });
    } else {
      console.log(`Found product entry`);
      console.log(productEntry);
      const productEntryIndex = cartItems.indexOf(productEntry);
      cartItems[productEntryIndex].productQuantity += productQuantity;
    }

    // create cookies for storing cart information
    createCookie(CART_COUNT, cartItems.length);
    createCookie(CART_ITEMS, JSON.stringify(cartItems));

    setCartItems(cartItems);
    setCartItemCount(cartItems.length);
  };
  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        cartItems,
        onAddToCart: addToCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
