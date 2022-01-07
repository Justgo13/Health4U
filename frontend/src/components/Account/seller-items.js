import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";

const SellerItems = () => {
  const {getUserInfo} = useAuthCookies();
  const userID = getUserInfo().id
  return (
    <MenuItem>
      <Link to={`/seller/items/${userID}`} className="full-width">
        <CustomButton className="white-inverse full-width">
          My Items
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default SellerItems;
