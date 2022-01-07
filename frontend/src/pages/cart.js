import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import CustomButton from "../components/custom-button";
import ErrorModal from "../components/Modal/error-modal";

import { useCartCookies } from "../shared/cookies/cart-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Cart = () => {
  const { getOrderSummary, getCartItems, checkoutCart } = useCartCookies();
  const { subTotal, taxes, total } = getOrderSummary();

  const { error, isLoading, clearError, sendRequest } = useHttpClient();
  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const showCartItems = () => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      return (
        <MuiTypography
          className="center-text top-bottom-padding"
          variant="h3"
          baseComponent="p"
        >
          Your cart is empty, go add something
        </MuiTypography>
      );
    }
    return <MuiGrid gridItems={cartItems} link="item" baseLink="shop" cart />;
  };

  const checkoutHandler = async () => {
    const cartItemsIds = getCartItems().map((item) => item.id);
    const userInfo = getUserInfo();
    await sendRequest("http://localhost:5000/api/user/addOrder", "POST", {
      id: userInfo.id,
      cartItems: cartItemsIds,
    });
    // checkoutCart();
  };

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container item-desc no-bottom-padding">
        {!!error && (
          <ErrorModal
            isModalShown={true}
            errorMessage={error}
            onClose={clearError}
          />
        )}
        <MuiDivider headerText="Order Summary" />
        <MuiBox className="no-bottom-padding">
          <MuiTypography
            variant="h4"
            baseComponent="p"
          >{`Sub Total - $${subTotal}`}</MuiTypography>
          <MuiTypography
            variant="h4"
            baseComponent="p"
          >{`HST & GST - $${taxes}`}</MuiTypography>
          <MuiTypography
            variant="h4"
            baseComponent="p"
          >{`Order Total - $${total}`}</MuiTypography>
        </MuiBox>
      </MuiBox>

      <MuiBox className="container">
        <MuiDivider headerText={`${"Jason's"} Cart`} />
        {showCartItems()}
      </MuiBox>

      <MuiBox className="center top-bottom-padding">
        <CustomButton
          className="xl-button white-inverse"
          onClick={checkoutHandler}
        >
          Checkout
        </CustomButton>
      </MuiBox>
    </Fragment>
  );
};

export default Cart;
