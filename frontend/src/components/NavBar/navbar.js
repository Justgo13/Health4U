import React, { Fragment, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Search from "./search";
import NavbarBrand from "./navbar-brand";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import ScrollReset from "../scroll-reset";
import CartPreviewModal from "../Modal/CartPreview/cart-preview-modal";
import ErrorModal from "../Modal/error-modal";

import { useModalReducer } from "../Modal/modal-reducer";
import { useCartCookies } from "../../shared/cookies/cart-cookies";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";

// Material UI custom components
import MuiBox from "../MaterialUI/mui-box";
import MuiContainer from "../MaterialUI/mui-container";
import MuiTypography from "../MaterialUI/mui-typography";

import AccountMenu from "../../components/Account/account-menu";

import "../../styles/navbar.css";

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

  const { resetSearchQuery, getSearchQuery, getCartItems, getCartCount } =
    useCartCookies();
  const {getLoggedInCookie} = useAuthCookies();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // reset search query cookie so that the previous state is not stored
    if (location.pathname !== "/shop/search") {
      resetSearchQuery();
    }
  }, [location.pathname]);

  const checkoutHandler = (e) => {
    navigate("/shop/cart/1");
    hideCartModal();
  };

  const searchHandler = () => {
    const searchQuery = getSearchQuery();
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
                <AccountMenu loggedIn={getLoggedInCookie()}/>
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
                  {getCartCount()}
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
          cartList={getCartItems()}
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
