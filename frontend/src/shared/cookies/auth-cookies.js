import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const LOGGED_IN = "loggedIn";
const USER_INFO = "userInfo";

export const useAuthCookies = () => {
  const [cookies, setCookie] = useCookies([LOGGED_IN, USER_INFO]);

  useEffect(() => {
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
  }, []);

  const updateUserInfo = ({name, email}) => {
    setCookie(USER_INFO, { name, email }, { path: "/" });
  };

  const login = () => {
    setCookie(LOGGED_IN, true, { path: "/" });
  };

  const logout = () => {
    setCookie(LOGGED_IN, false, { path: "/" });
  };

  const getLoggedInCookie = () => cookies[LOGGED_IN];

  const getUserInfo = () => cookies[USER_INFO];

  return { updateUserInfo, login, logout, getLoggedInCookie, getUserInfo };
};
