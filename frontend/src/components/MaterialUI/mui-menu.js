import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";

import CustomButton from "../custom-button";

import "../../styles/mui.css";
import "../../styles/navbar.css";

const MuiMenu = ({ size, menuChoices, menuMainButtonText }) => {
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
        {menuMainButtonText}
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
        {menuChoices &&
          menuChoices.map((menuChoice) => (
            <MenuItem key={menuChoice}>
              <Typography textAlign="center">{menuChoice}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </React.Fragment>
  );
};

export default MuiMenu;