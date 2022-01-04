import React, { useState } from "react";
import { Menu } from "@mui/material";

import CustomButton from "../custom-button";
import MuiTypography from "./mui-typography";

import "../../styles/mui.css";
const MuiMenu = ({ size, menuMainButtonText, menuContent }) => {
  const [menuState, setMenuState] = useState(null);

  const showUserMenuHandler = (event) => {
    setMenuState(event.currentTarget); // currentTarget is the main menu button, if the menu button is clicked we set menu state to the html of this button element
  };

  const hideUserMenuHandler = () => {
    setMenuState(null);
  };

  return (
    <React.Fragment>
      <CustomButton
        variant="text"
        size="large"
        onClick={showUserMenuHandler}
        className="nav-btn"
      >
        <MuiTypography variant="h5" className="no-margin">
          {menuMainButtonText}
        </MuiTypography>
      </CustomButton>
      <Menu
        sx={{ mt: `${size || "3rem"}` }}
        anchorEl={menuState}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuState)}
        onClose={hideUserMenuHandler}
      >
        {menuContent}
      </Menu>
    </React.Fragment>
  );
};

export default MuiMenu;
