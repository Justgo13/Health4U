import React from "react";

import MuiMenu from "../MaterialUI/mui-menu";
import MuiBox from "../MaterialUI/mui-box";

import SignUp from "./sign-up";
import Login from "./login";

const AccountMenu = () => {
  return (
    <MuiMenu
      menuMainButtonText="Account"
      menuContent={
        <MuiBox>
          <SignUp />
          <Login />
        </MuiBox>
      }
    />
  );
};

export default AccountMenu;
