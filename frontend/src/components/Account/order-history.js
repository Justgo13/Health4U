import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";

const OrderHistory = () => {
  return (
    <MenuItem>
      <Link to="/buyer/order-history/1" className="full-width">
        <CustomButton className="white-inverse full-width">
          Order History
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default OrderHistory;
