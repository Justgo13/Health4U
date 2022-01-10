import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";

const Logout = () => {
  const { logout } = useAuthCookies();

  const logoutHandler = () => {
    logout();
  };
  return (
    <MenuItem>
      <Link to={"/shop"} className="full-width">
        <CustomButton
          className="white-inverse full-width"
          onClick={logoutHandler}
        >
          Logout
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default Logout;
