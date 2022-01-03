import React, { Fragment } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import Search from "./search";
import NavbarBrand from "./navbar-brand";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import ScrollReset from "../scroll-reset";
import CartPreviewModal from "../Modal/CartPreview/cart-preview-modal";

import { useModalReducer } from "../Modal/modal-reducer";

import {
  getCartItemCount,
  getCartItems,
} from "../../shared/cookies/cart-cookie-handlers";

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
  const [modalState, showModalHandler, hideModalHandler] = useModalReducer({
    showModal: false,
  });

  const navigate = useNavigate();

  const checkoutHandler = (e) => {
    navigate("/shop/cart/1");
    hideModalHandler();
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
                onClick={showModalHandler}
              >
                <FontAwesomeIcon className="fa-shopping-cart" />
                <MuiTypography
                  variant="p"
                  baseComponent="p"
                  style={{ marginLeft: "0.5rem" }}
                >
                  {getCartItemCount()}
                </MuiTypography>
              </CustomButton>
            </MuiBox>
          </Toolbar>
        </MuiContainer>
      </AppBar>

      <Outlet />
      {modalState.showModal && (
        <CartPreviewModal
          isModalShown={modalState.showModal}
          onClose={hideModalHandler}
          cartList={getCartItems()}
          buttonHandler={checkoutHandler}
        />
      )}
    </Fragment>
  );
};

export default Navbar;
