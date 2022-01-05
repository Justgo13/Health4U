import React from "react";

import MuiMenu from "../MaterialUI/mui-menu";
import MuiBox from "../MaterialUI/mui-box";

import SignUp from "./sign-up";
import Login from "./login";
import Logout from "./logout";
import Profile from "./profile";
import OrderHistory from "./order-history";
import Bookmarks from "./bookmarks";

const AccountMenu = ({ loggedIn, menuText, accountType }) => {
  if (loggedIn === "true") {
    if (accountType === "Buyer") {
      return (
        <MuiMenu
          menuMainButtonText={`Welcome ${menuText}`}
          menuContent={
            <MuiBox>
              <Profile accountType={accountType} />
              <OrderHistory />
              <Bookmarks />
              <Logout />
            </MuiBox>
          }
        />
      );
    } else {
      // Seller
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
