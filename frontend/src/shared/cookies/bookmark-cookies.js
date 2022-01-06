import React from "react";
import { useCookies } from "react-cookie";

const BOOKMARKS = "bookmarks";

export const useBookmarkCookies = () => {
  const [cookies, setCookie] = useCookies([BOOKMARKS]);
  const cookieInitVals = [
    {
      name: BOOKMARKS,
      value: {},
    },
  ];
  for (const cookie of cookieInitVals) {
    if (!cookies[cookie.name]) {
      setCookie(cookie.name, cookie.value, { path: "/" });
    }
  }

  const addUserBookmark = (userID, itemID) => {
    const bookmarks = cookies[BOOKMARKS];

    /**
     * bookmarks look like
     * {
     *  "123": ["1", "2"]
     * }
     */

    if (!bookmarks.hasOwnProperty(userID)) {
      // add new entry
      bookmarks[userID] = [itemID];
    } else {
      const user = bookmarks[userID];
      user.push(itemID);
      bookmarks[userID] = user;
    }

    setCookie(BOOKMARKS, bookmarks, { path: "/" });
  };

  const removeUserBookmark = (userID, itemID) => {
    const bookmarks = cookies[BOOKMARKS];

    if (bookmarks.hasOwnProperty(userID)) {
      let user = bookmarks[userID];
      user = user.filter((bookmark) => bookmark !== userID); // removing the bookmark from a user
      bookmarks[userID] = user;
      setCookie(BOOKMARKS, bookmarks, { path: "/" });
    }
  };

  const getUserBookmarks = (userID) => {
    const bookmarks = cookies[BOOKMARKS];
    let user = bookmarks.hasOwnProperty(userID);
    if (user) {
      user = bookmarks[userID];
      return user;
    } else {
      return undefined;
    }
  };

  const userBookmarkExists = (userID, itemID) => {
    const bookmarks = cookies[BOOKMARKS];
    let user = bookmarks.hasOwnProperty(userID);
    if (user) {
      user = bookmarks[userID];
      return user.includes(itemID);
    } else {
      return false;
    }
  };

  return {
    addUserBookmark,
    getUserBookmarks,
    removeUserBookmark,
    userBookmarkExists,
  };
};
