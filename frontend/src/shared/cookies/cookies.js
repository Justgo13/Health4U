import React from "react";
import { useCookies } from "react-cookie";

export const CART_COUNT = "cartItemCount";
export const CART_ITEMS = "cartItems";
export const SEARCH_QUERY = "searchQuery";

export const useCustomCookies = () => {
  const [cookies, setCookies] = useCookies([
    CART_COUNT,
    CART_ITEMS,
    SEARCH_QUERY,
  ]);

  const initCookies = () => {
    // setup cookies if not already set
    if (Object.keys(cookies).length === 0) {
      setCookies(CART_COUNT, 0);
      setCookies(CART_ITEMS, []);
      setCookies(SEARCH_QUERY, []);
    }
  };

  const onCartCountCookieChange = (cookieValue) => {
    setCookies(CART_COUNT, cookieValue, { path: "/" });
  };

  const onCartItemsCookieChange = ({ name, quantity, image, price }) => {
    const cartItems = cookies[CART_ITEMS];
    /**
     * Cart items looks like
     * [
     *  {
     *    name: "Mask",
     *    image: "someImage.png",
     *    quantity: 2,
     *    price: 4.33
     *  },
     *  ...
     * ]
     */
    const productEntry = cartItems.find((item) => item.name === name);

    // check if the product exists in the cart, if it doesn't add a new entry, otherwise update the existing entry with a new quantity
    if (!productEntry) {
      console.log(`Product ${name} not found, adding new entry`);
      cartItems.push({
        name,
        image,
        quantity,
        price,
      });
    } else {
      console.log(`Found product entry`);
      console.log(productEntry);
      const productEntryIndex = cartItems.indexOf(productEntry);
      cartItems[productEntryIndex].quantity += quantity;
    }

    // create cookies for storing cart information
    setCookies(CART_COUNT, cartItems.length, { path: "/" });
    setCookies(CART_ITEMS, cartItems, { path: "/" });
  };

  const onSearchQueryCookieChange = (cookieValue) => {
    setCookies(SEARCH_QUERY, cookieValue, { path: "/" });
  };

  const getOrderSummary = () => {
    let subTotal = 0;
    let taxes = 0;
    let total = 0;

    const cartItems = cookies[CART_ITEMS]
    cartItems.forEach((item) => {
      subTotal += item.quantity * item.price;
    });

    subTotal = subTotal.toFixed(2);
    taxes = (subTotal * 0.13).toFixed(2);
    total = (parseFloat(subTotal) + parseFloat(taxes)).toFixed(2);

    return { subTotal, taxes, total };
  };
  
  return {
    cookies,
    onCartCountCookieChange,
    onCartItemsCookieChange,
    onSearchQueryCookieChange,
    initCookies,
    getOrderSummary
  };
};
