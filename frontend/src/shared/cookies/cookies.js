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
    if (!cookies[CART_COUNT]) {
      console.log("initializing cart count cookie");
      setCookies(CART_COUNT, 0);
    }
    if (!cookies[CART_ITEMS]) {
      console.log("initializing cart items cookie");
      setCookies(CART_ITEMS, []);
    }
    if (!cookies[SEARCH_QUERY]) {
      console.log("initializing search query cookie");
      setCookies(SEARCH_QUERY, []);
    }
  };

  const onCartCountCookieChange = (cookieValue) => {
    setCookies(CART_COUNT, cookieValue, { path: "/" });
  };

  const onCartItemsCookieChange = ({ id, name, quantity, image, price }) => {
    const cartItems = cookies[CART_ITEMS];
    /**
     * Cart items looks like
     * [
     *  {
     *    id: "1"
     *    name: "Mask",
     *    image: "someImage.png",
     *    quantity: 2,
     *    price: 4.33
     *  },
     *  ...
     * ]
     */
    const productEntry = cartItems.find((item) => item.id === id);

    // check if the product exists in the cart, if it doesn't add a new entry, otherwise update the existing entry with a new quantity
    if (!productEntry) {
      console.log(`Product ${name} not found, adding new entry`);
      cartItems.push({
        id,
        name,
        image,
        quantity,
        price,
      });
      console.log("Added new entry");
      console.log(cartItems[cartItems.length - 1]);
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

    const cartItems = cookies[CART_ITEMS];
    cartItems.forEach((item) => {
      subTotal += item.quantity * item.price;
    });

    subTotal = subTotal.toFixed(2);
    taxes = (subTotal * 0.13).toFixed(2);
    total = (parseFloat(subTotal) + parseFloat(taxes)).toFixed(2);

    console.log("Subtotal ", subTotal, " Taxes ", taxes, " Total ", total);

    return { subTotal, taxes, total };
  };

  const resetSearchQuery = () => {
    setCookies(SEARCH_QUERY, [], { path: "/" });
  };

  const deleteCartItem = (id) => {
    console.log(id);
    let cartItems = cookies[CART_ITEMS];

    cartItems = cartItems.filter((item) => item.id !== id);
    console.log(cartItems);

    setCookies(CART_COUNT, cartItems.length, { path: "/" });
    setCookies(CART_ITEMS, cartItems, { path: "/" });
  };

  const setItemQuantity = (id, quantity) => {
    console.log("q",quantity);
    const cartItems = cookies[CART_ITEMS];
    const item = cartItems.find((item) => item.id === id);
    item.quantity = quantity
    setCookies(CART_ITEMS, cartItems, {path: "/"})
  };

  const getCartItems = () => cookies[CART_ITEMS]

  return {
    cookies,
    onCartCountCookieChange,
    onCartItemsCookieChange,
    onSearchQueryCookieChange,
    initCookies,
    getOrderSummary,
    resetSearchQuery,
    deleteCartItem,
    setItemQuantity,
    getCartItems
  };
};
