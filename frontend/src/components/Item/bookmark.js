import React, { useState, useEffect } from "react";
import MuiBox from "../MaterialUI/mui-box";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";
import { useBookmarkCookies } from "../../shared/cookies/bookmark-cookies";

const Bookmark = ({ itemID }) => {
  const { getLoggedInCookie, getUserInfo } = useAuthCookies();
  const { addUserBookmark, removeUserBookmark, userBookmarkExists } =
    useBookmarkCookies();

  const loggedIn = getLoggedInCookie();
  const userInfo = getUserInfo();
  const userID = userInfo.id;

  const [bookMarkClicked, setBookMarkClicked] = useState(false);
  const bookmarkHandler = (e) => {
    if (loggedIn === "true") {
      if (!bookMarkClicked) {
        addUserBookmark(userID, itemID);
        setBookMarkClicked(true);
      } else {
        removeUserBookmark(userID, itemID);
        setBookMarkClicked(false);
      }
    }
  };

  useEffect(() => {
    const bookmarkExists = userBookmarkExists(userID, itemID);
    if (bookmarkExists) {
      setBookMarkClicked(true);
    }
  }, [userBookmarkExists, userID, itemID]);

  return (
    <MuiBox className="small-box right-align">
      <CustomButton
        variant="text"
        className="black no-btn-padding"
        onClick={bookmarkHandler}
      >
        {!bookMarkClicked && (
          <FontAwesomeIcon
            baseClassName="far"
            className="fa-bookmark"
            fontSize="3rem"
          />
        )}

        {bookMarkClicked && (
          <FontAwesomeIcon className="fa-bookmark" fontSize="3rem" />
        )}
        <span className="align-top">
          <FontAwesomeIcon className="fa-plus" />
        </span>
      </CustomButton>
    </MuiBox>
  );
};

export default Bookmark;
