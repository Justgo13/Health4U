import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import Search from "./search";
import NavbarBrand from "./navbar-brand";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";

const settings = [
  "Buyer Sign Up",
  "Buyer Login",
  "Seller Sign Up",
  "Seller Login",
];

const Navbar = () => {
  const [accountMenu, setAccountMenu] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAccountMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAccountMenu(null);
  };

  return (
    <AppBar position="static" className="app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarBrand />
          <Box className="box">
            <Search />
          </Box>
          <Box className="box nav-items">
            <Box>
              <CustomButton
                variant="text"
                size="large"
                onClick={handleOpenUserMenu}
                className="nav-btn"
              >
                Account
              </CustomButton>
              <Menu
                sx={{ mt: "3rem" }}
                anchorEl={accountMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(accountMenu)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <CustomButton variant="text" size="large" className="nav-btn">
              <FontAwesomeIcon className="fa-cart-plus"/>
              <p id="cart-total">0</p>
            </CustomButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
