import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";

const Bookmarks = () => {
  const {getUserInfo} = useAuthCookies();
  const userID = getUserInfo().id
  return (
    <MenuItem>
      <Link to={`/buyer/bookmarks/${userID}`} className="full-width">
        <CustomButton className="white-inverse full-width">
          My Bookmarks
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default Bookmarks;
