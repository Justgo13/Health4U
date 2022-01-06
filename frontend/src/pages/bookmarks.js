import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";
import { useParams } from "react-router-dom";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";

const users = [
  {
    id: "buyerID",
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
const Bookmarks = () => {
  const { userID } = useParams();
  const user = users.find((u) => u.id === userID);

  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText={`${user.name}'s Bookmarks`} />

        <MuiGrid gridItems={user.bookmarks} link="item" baseLink="shop" />
      </MuiBox>
    </Fragment>
  );
};

export default Bookmarks;
