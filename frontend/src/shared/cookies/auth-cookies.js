import React from "react";
import { useCookies } from "react-cookie";

const LOGGED_IN = "loggedIn";
const USER_INFO = "userInfo";

export const useAuthCookies = () => {
  const [cookies, setCookie] = useCookies([LOGGED_IN, USER_INFO]);
  const cookieInitVals = [
    {
      name: LOGGED_IN,
      value: false,
    },
    {
      name: USER_INFO,
      value: {},
    },
  ];
  for (const cookie of cookieInitVals) {
    if (!cookies[cookie.name]) {
      setCookie(cookie.name, cookie.value, { path: "/" });
    }
  }

  const updateUserInfo = ({id, name, email, accountType}) => {
    setCookie(USER_INFO, { id, name, email, accountType }, { path: "/" });
  };

  const login = () => {
    setCookie(LOGGED_IN, true, { path: "/" });
  };

  const logout = () => {
    setCookie(LOGGED_IN, false, { path: "/" });
    setCookie(USER_INFO, {}, {path: "/"})
  };

  const getLoggedInCookie = () => cookies[LOGGED_IN];

  const getUserInfo = () => cookies[USER_INFO];

  return { updateUserInfo, login, logout, getLoggedInCookie, getUserInfo };
};
