import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button";

const Login = () => {
  return (
    <MenuItem>
      <Link to="/auth/login" className="full-width">
        <CustomButton className="white-inverse full-width">
          Login
        </CustomButton>
      </Link>
    </MenuItem>
  );
};

export default Login;
