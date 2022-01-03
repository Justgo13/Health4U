import { getCookie, createCookie, CART_COUNT, CART_ITEMS } from "./cookies";

export const initializeCartCookies = () => {
  let cartItemCount = getCookie(CART_COUNT);
  let cartItems = getCookie(CART_ITEMS);

  cartItemCount === null
    ? createCookie(CART_COUNT, 0)
    : console.log("cart item count cookie exists");
  cartItems === null
    ? createCookie(CART_ITEMS, JSON.stringify([]))
    : console.log("cart items cookie exists");
};

export const addToCartHandler = ({
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

  // check if the product exists in the cart, if it doesn't add a new entry, otherwise update the existing entry with a new quantity
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
};

export const getOrderSummary = () => {
  let subTotal = 0;
  let taxes = 0;
  let total = 0;

  const cartItems = JSON.parse(getCookie(CART_ITEMS));
  cartItems.forEach((item) => {
    subTotal += item.productQuantity * item.productPrice;
  });

  subTotal = subTotal.toFixed(2);
  taxes = (subTotal * 0.13).toFixed(2);
  total = (parseFloat(subTotal) + parseFloat(taxes)).toFixed(2);

  return { subTotal, taxes, total };
};

export const getCartItems = () => {
  return JSON.parse(getCookie(CART_ITEMS));
};

export const getCartItemCount = () => {
  return JSON.parse(getCookie(CART_COUNT)) || 0;
};