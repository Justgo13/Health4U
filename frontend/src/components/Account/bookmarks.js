import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";

const Bookmarks = () => {
  return (
    <MenuItem>
      <Link to="/buyer/bookmarks/buyerID" className="full-width">
        <CustomButton className="white-inverse full-width">
          My Bookmarks
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default Bookmarks;
