import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";

const Profile = ({ accountType }) => {
  let link;
  switch (accountType) {
    case "Buyer":
      link = "/buyer/profile/1";
      break;
    case "Seller":
      link = "/seller/profile/2";
      break;
    default:
      break;
  }
  return (
    <MenuItem>
      <Link to={link} className="full-width">
        <CustomButton className="white-inverse full-width">
          My Profile
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default Profile;
