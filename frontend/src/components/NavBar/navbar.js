import React from "react";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
} from "@mui/material";

import Search from "./search";
import NavbarBrand from "./navbar-brand";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";

// Material UI custom components
import MuiBox from "../MaterialUI/mui-box";
import MuiContainer from "../MaterialUI/mui-container";
import MuiMenu from "../MaterialUI/mui-menu";

const accountChoices = [
  "Buyer Sign Up",
  "Buyer Login",
  "Seller Sign Up",
  "Seller Login",
];

const Navbar = () => {
  return (
    <AppBar position="static" className="app-bar">
      <MuiContainer maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarBrand />
          <MuiBox>
            <Search />
          </MuiBox>
          <MuiBox className="nav-items">
            <MuiBox>
              <MuiMenu menuChoices={accountChoices} menuMainButtonText="Account"/>
            </MuiBox>
            <CustomButton variant="text" size="large" className="nav-btn">
              <FontAwesomeIcon className="fa-cart-plus" />
              <p id="cart-total">0</p>
            </CustomButton>
          </MuiBox>
        </Toolbar>
      </MuiContainer>
    </AppBar>
  );
};

export default Navbar;
