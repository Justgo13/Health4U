import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";

const SignUp = () => {
  return (
    <MenuItem>
      <Link to="/auth/sign-up" className="full-width">
        <CustomButton className="white-inverse full-width">
          Sign Up
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default SignUp;
