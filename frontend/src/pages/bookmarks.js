import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar/navbar";
import { useParams } from "react-router-dom";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";

import { useBookmarkCookies } from "../shared/cookies/bookmark-cookies";
import { useAuthCookies } from "../shared/cookies/auth-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

// const users = [
//   {
//     id: "1",
//     name: "Jim Grey",
//     email: "jim.grey23@hotmail.com",
//     accountType: "buyer",
//     bookmarks: [
//       {
//         id: "1",
//         name: "Black mask",
//         category: "mask",
//         description: "Black facial mask",
//         image:
//           "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
//         price: 2.12,
//         rating: 2.2,
//       },
//     ],
//   },
// ];

const allItems = [
  {
    id: "1",
    name: "Black mask",
    category: "mask",
    description: "Black facial mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    price: 2.12,
    rating: 2.2,
  },
  {
    id: "2",
    name: "Pink mask",
    category: "mask",
    description: "Pink facial mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    price: 2.12,
    rating: 2.2,
  },
];

const Bookmarks = () => {
  const { getUserInfo } = useAuthCookies();
  const user = getUserInfo();
  // const { getUserBookmarks } = useBookmarkCookies();
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const [loadedBookmarks, setLoadedBookmarks] = useState([]);

  let bookmarks;
  useEffect(() => {
    const getBookmarks = async () => {
      let res = await sendRequest(
        `http://localhost:5000/api/user/getBookmarks/${user.id}`
      );

      bookmarks = res.bookmarks;
      bookmarks = bookmarks.map((itemID) => {
        const itemObj = allItems.find((item) => item.id === itemID);
        return itemObj;
      });
      setLoadedBookmarks(bookmarks)
    };

    getBookmarks();
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

      {isLoading && <LoadingCircle/>}
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
