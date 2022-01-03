import React, { Fragment } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Search from "./search";
import NavbarBrand from "./navbar-brand";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import ScrollReset from "../scroll-reset";
import CartPreviewModal from "../Modal/CartPreview/cart-preview-modal";
import ErrorModal from "../Modal/error-modal";

import { useModalReducer } from "../Modal/modal-reducer";
import {
  CART_COUNT,
  CART_ITEMS,
  SEARCH_QUERY,
  useCustomCookies,
} from "../../shared/cookies/cookies";

// Material UI custom components
import MuiBox from "../MaterialUI/mui-box";
import MuiContainer from "../MaterialUI/mui-container";
import MuiMenu from "../MaterialUI/mui-menu";
import MuiTypography from "../MaterialUI/mui-typography";

import "../../styles/navbar.css";
const accountChoices = [
  "Buyer Sign Up",
  "Buyer Login",
  "Seller Sign Up",
  "Seller Login",
];

const Navbar = () => {
  const [
    modalState,
    showCartModal,
    hideCartModal,
    showSearchErrorModal,
    hideSearchErrorModal,
  ] = useModalReducer({
    isCartModalShown: false,
    isSearchErrorModalShown: false,
  });

  const { cookies } = useCustomCookies();

  const navigate = useNavigate();

  const checkoutHandler = (e) => {
    navigate("/shop/cart/1");
    hideCartModal();
  };

  const searchHandler = () => {
    const searchQuery = cookies[SEARCH_QUERY];
    if (searchQuery.length === 0) {
      showSearchErrorModal();
    } else {
      navigate("/shop/search");
    }
  };

  return (
    <Fragment>
      <ScrollReset />
      <AppBar position="static" className="app-bar">
        <MuiContainer maxWidth="xl">
          <Toolbar disableGutters>
            <NavbarBrand />
            <MuiBox>
              <Search />
            </MuiBox>

            <CustomButton
              variant="text"
              size="medium"
              className="nav-btn no-btn-padding horizontal-margin"
              onClick={searchHandler}
            >
              <FontAwesomeIcon className="fa-search red" fontSize="2rem" />
            </CustomButton>

            <MuiBox className="nav-items">
              <MuiBox>
                <MuiMenu
                  menuChoices={accountChoices}
                  menuMainButtonText="Account"
                />
              </MuiBox>
              <CustomButton
                variant="text"
                size="large"
                className="nav-btn"
                onClick={showCartModal}
              >
                <FontAwesomeIcon className="fa-shopping-cart" />
                <MuiTypography
                  variant="p"
                  baseComponent="p"
                  style={{ marginLeft: "0.5rem" }}
                >
                  {cookies[CART_COUNT]}
                </MuiTypography>
              </CustomButton>
            </MuiBox>
          </Toolbar>
        </MuiContainer>
      </AppBar>

      {modalState.isCartModalShown && (
        <CartPreviewModal
          isModalShown={modalState.isCartModalShown}
          onClose={hideCartModal}
          cartList={cookies[CART_ITEMS]}
          buttonHandler={checkoutHandler}
        />
      )}

      {modalState.isSearchErrorModalShown && (
        <ErrorModal
          isModalShown={modalState.isSearchErrorModalShown}
          onClose={hideSearchErrorModal}
          errorMessage="Invalid search, please choose an option"
        />
      )}
    </Fragment>
  );
};

export default Navbar;
