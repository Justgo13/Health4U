import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";

const OrderHistory = () => {
  const {getUserInfo} = useAuthCookies();
  const userID = getUserInfo().id
  return (
    <MenuItem>
      <Link to={`/buyer/order-history/${userID}`} className="full-width">
        <CustomButton className="white-inverse full-width">
          Order History
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default OrderHistory;
