import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";
import { useParams } from "react-router-dom";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";

import { useBookmarkCookies } from "../shared/cookies/bookmark-cookies";

const users = [
  {
    id: "1",
    name: "Jim Grey",
    email: "jim.grey23@hotmail.com",
    accountType: "buyer",
    bookmarks: [
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
    ],
  },
];

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
  const { userID } = useParams();
  const user = users.find((u) => u.id === userID);
  const { getUserBookmarks } = useBookmarkCookies();
  let userBookmarks = getUserBookmarks(userID); // looks like ["1", "2", "3"]
  userBookmarks = userBookmarks.map((itemID) => {
    const itemObj = allItems.find((item) => item.id === itemID);
    return itemObj;
  });
  console.log(userBookmarks);

  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText={`${user.name}'s Bookmarks`} />

        <MuiGrid gridItems={userBookmarks} link="item" baseLink="shop" />
      </MuiBox>
    </Fragment>
  );
};

export default Bookmarks;
