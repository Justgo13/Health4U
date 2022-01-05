import React from "react";

import MuiMenu from "../MaterialUI/mui-menu";
import MuiBox from "../MaterialUI/mui-box";

import SignUp from "./sign-up";
import Login from "./login";
import Logout from "./logout";

const AccountMenu = ({ loggedIn , menuText}) => {
  if (loggedIn === "true") {
    return (
      <MuiMenu
        menuMainButtonText={`Welcome ${menuText}`}
        menuContent={
          <MuiBox>
            <Logout />
          </MuiBox>
        }
      />
    );
  }

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
