import React, { Fragment, useState } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import CustomButton from "../components/custom-button";
import ErrorModal from "../components/Modal/error-modal";
import TextSection from "../components/text-section";

import { useCartCookies } from "../shared/cookies/cart-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Cart = () => {
  const { getOrderSummary, getCartItems } = useCartCookies();
  const { subTotal, taxes, total } = getOrderSummary();

  const [badUserCheckout, setBadUserCheckout] = useState(false);

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

  const textLines = [
    {
      label: "Sub Total",
      text: subTotal,
    },
    {
      label: "Taxes",
      text: taxes,
    },
    {
      label: "Total",
      text: total,
    },
  ];

  const checkoutHandler = async () => {
    const cartItemsIds = getCartItems().map((item) => item.id);
   

    // only if user is a buyer

    if (userInfo.accountType === "Buyer") {
      await sendRequest("http://localhost:5000/api/user/addOrder", "POST", {
        id: userInfo.id,
        cartItems: cartItemsIds,
      });
    } else {
      setBadUserCheckout(true);
    }
  };

  return (
    <Fragment>
      <Navbar />

      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {badUserCheckout && (
        <ErrorModal
          isModalShown={true}
          errorMessage="Only buyer accounts can checkout"
          onClose={() => setBadUserCheckout(false)}
        />
      )}

      <TextSection sectionHeader="Related Products" textLines={textLines} />

      <MuiBox className="container">
        <MuiDivider headerText={`${userInfo.name}'s Cart`} />
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
