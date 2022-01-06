import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { getDate } from "../../utils/date";

const CART_COUNT = "cartItemCount";
const CART_ITEMS = "cartItems";
const SEARCH_QUERY = "searchQuery";
const CART_ITEM_ORDER_DATE = "cartItemOrderDate";
const CART = "cart";

export const useCartCookies = () => {
  const [cookies, setCookie] = useCookies([
    CART_COUNT,
    CART_ITEMS,
    SEARCH_QUERY,
    CART_ITEM_ORDER_DATE,
    CART,
  ]);

  useEffect(() => {
    const cookieInitVals = [
      {
        name: CART_COUNT,
        value: 0,
      },
      {
        name: CART_ITEMS,
        value: [],
      },
      {
        name: SEARCH_QUERY,
        value: [],
      },
      {
        name: CART_ITEM_ORDER_DATE,
        value: [],
      },
      {
        name: CART,
        value: [],
      },
    ];
    for (const cookie of cookieInitVals) {
      if (!cookies[cookie.name]) {
        setCookie(cookie.name, cookie.value, { path: "/" });
      }
    }
  }, []);

  const onCartCountCookieChange = (cookieValue) => {
    setCookie(CART_COUNT, cookieValue, { path: "/" });
  };

  const onCartItemsCookieChange = ({
    id,
    name,
    quantity,
    image,
    price,
    orderDate,
  }) => {
    const cartItems = cookies[CART_ITEMS];
    /**
     * Cart items looks like
     * [
     *  {
     *    id: "1"
     *    name: "Mask",
     *    image: "someImage.png",
     *    quantity: 2,
     *    price: 4.33,
     *    rating: 2.2,
     *    orderDate: "Jan 03, 2021"
     *  },
     *  ...
     * ]
     */
    const productEntry = cartItems.find((item) => item.id === id);

    // check if the product exists in the cart, if it doesn't add a new entry, otherwise update the existing entry with a new quantity
    if (!productEntry) {
      console.log(`Product ${name} not found, adding new entry`);
      cartItems.unshift({
        id,
        name,
        image,
        quantity,
        price,
        orderDate,
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
    setCookie(CART_COUNT, cartItems.length, { path: "/" });
    setCookie(CART_ITEMS, cartItems, { path: "/" });
  };

  const onSearchQueryCookieChange = (cookieValue) => {
    setCookie(SEARCH_QUERY, cookieValue, { path: "/" });
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
    setCookie(SEARCH_QUERY, [], { path: "/" });
  };

  const deleteCartItem = (id) => {
    let cartItems = cookies[CART_ITEMS];

    cartItems = cartItems.filter((item) => item.id !== id);

    setCookie(CART_COUNT, cartItems.length, { path: "/" });
    setCookie(CART_ITEMS, cartItems, { path: "/" });
  };

  const setItemQuantity = (id, quantity) => {
    const cartItems = cookies[CART_ITEMS];
    const item = cartItems.find((item) => item.id === id);
    item.quantity = quantity;
    setCookie(CART_ITEMS, cartItems, { path: "/" });
  };

  const getCartItems = () => cookies[CART_ITEMS];

  const getSearchQuery = () => cookies[SEARCH_QUERY];

  const getCartCount = () => cookies[CART_COUNT];

  const getItemOrderDate = (itemID) => {
    const cartItems = cookies[CART_ITEMS];
    const item = cartItems.find((i) => i.id === itemID);

    return item.orderDate;
  };

  const addItemByOrderDate = () => {
    /**
     * cartItemOrderDate looks like
     * [
     *  {
     *    orderDate: "Jan 03, 2022"
     *    orderItem: [itemObj]
     *  }
     * ]
     *
     *
     * itemObj looks like
     *
     * {
     *    id: "1"
     *    name: "Mask",
     *    image: "someImage.png",
     *    quantity: 2,
     *    price: 4.33,
     *    rating: 2.2,
     *    orderDate: "Jan 03, 2021"
     *  },
     */
    let cartItemsOrderDate = cookies[CART_ITEM_ORDER_DATE];
    let cart = cookies[CART];

    cart.map((cartEntry) => {
      if (cartItemsOrderDate.length === 0) {
        cartItemsOrderDate.push({
          orderDate: cartEntry.orderDate,
          orderItems: cartEntry.cartItems,
        });
      } else {
        const orderDateObj = cartItemsOrderDate.find(
          (obj) => obj.orderDate === cartEntry.orderDate
        );

        if (!orderDateObj) {
          // create new entry
          cartItemsOrderDate.push({
            orderDate: orderDateObj,
            orderItems: cartEntry.cartItems,
          });
        } else {
          // existing entry
          orderDateObj.orderItems = cartEntry.cartItems
        }
      }
    });

    setCookie(CART_ITEM_ORDER_DATE, cartItemsOrderDate, { path: "/" });
  };

  const getCartItemOrderDate = () => cookies[CART_ITEM_ORDER_DATE];

  const checkoutCart = () => {
    const orderDate = getDate();
    const cartItems = cookies[CART_ITEMS];
    const cart = cookies[CART];

    /**
     * Cart looks like
     *
     * [
     *  {
     *    cartItems: []
     *    orderDate: ""
     *  }
     * ]
     */

    // empty cart case
    if (cart.length === 0) {
      cart.push({
        cartItems,
        orderDate,
      });
    } else {
      // find if the current checkouted cart exists by looking for orderDate

      const cartEntry = cart.find(entry => entry.orderDate === orderDate) 

      if (!cartEntry) {
        // add new entry
        cart.push({
          cartItems,
          orderDate,
        });
      } else {
        // cart exists for this order date, update the cart items

        cartEntry.cartItems = cartItems
      }
    }

    setCookie(CART, cart)
  };

  return {
    onCartCountCookieChange,
    onCartItemsCookieChange,
    onSearchQueryCookieChange,
    getOrderSummary,
    resetSearchQuery,
    deleteCartItem,
    setItemQuantity,
    getCartItems,
    getSearchQuery,
    getCartCount,
    getItemOrderDate,
    addItemByOrderDate,
    getCartItemOrderDate,
    checkoutCart
  };
};
