import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import { useAuthCookies } from "../shared/cookies/auth-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

const Bookmarks = () => {
  const { getUserInfo } = useAuthCookies();
  const user = getUserInfo();
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const [loadedBookmarks, setLoadedBookmarks] = useState([]);

  let bookmarks;
  useEffect(() => {
    const getBookmarks = async () => {
      let res = await sendRequest(`/api/user/getBookmarks/${user.id}`);

      bookmarks = res.bookmarks;

      bookmarks = await Promise.all(
        bookmarks.map(async (itemID) => {
          res = await sendRequest(`/api/item/getItem/${itemID}`);
          return res.item;
        })
      );

      setLoadedBookmarks(bookmarks);
    };

    if (user.accountType === "Buyer") {
      getBookmarks();
    }
  }, [sendRequest, user]);

  return (
    <Fragment>
      <Navbar />
      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {isLoading && <LoadingCircle />}
      {!isLoading && (
        <MuiBox className="container top-bottom-padding">
          <MuiDivider headerText={`${user.name}'s Bookmarks`} />

          <MuiGrid gridItems={loadedBookmarks} link="item" baseLink="shop" />
        </MuiBox>
      )}
    </Fragment>
  );
};

export default Bookmarks;
