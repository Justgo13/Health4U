import React, { useState, useEffect } from "react";
import MuiBox from "../MaterialUI/mui-box";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../Modal/error-modal";

const Bookmark = ({ itemID }) => {
  const { getLoggedInCookie, getUserInfo } = useAuthCookies();

  const loggedIn = getLoggedInCookie();
  const userInfo = getUserInfo();
  const userID = userInfo.id;

  const [bookMarkClicked, setBookMarkClicked] = useState(false);

  const { error, sendRequest, clearError } = useHttpClient();

  const bookmarkHandler = async (e) => {
    if (loggedIn === "true") {
      if (!bookMarkClicked) {
        await sendRequest(
          "http://localhost:5000/api/user/addBookmark",
          "POST",
          {
            id: userID,
            itemID,
          }
        );
        setBookMarkClicked(true);
      } else {
        await sendRequest(
          "http://localhost:5000/api/user/removeBookmark",
          "DELETE",
          {
            id: userID,
            itemID,
          }
        );
        setBookMarkClicked(false);
      }
    }
  };

  // always toggle off bookmark when not logged in
  useEffect(() => {
    if (!loggedIn) {
      setBookMarkClicked(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    const userHasBookmark = async () => {
      if (userID) {
        let res = await sendRequest(
          `http://localhost:5000/api/user/getBookmarks/${userID}`
        );

        let bookmarks = res.bookmarks;
        if (bookmarks.includes(itemID)) {
          setBookMarkClicked(true);
        }
      }
    };

    userHasBookmark();
  }, [sendRequest, userID, itemID]);

  return (
    <MuiBox className="small-box right-align">
      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}
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
