import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import { useCustomCookies, SEARCH_QUERY } from "../shared/cookies/cookies";

// temporary until db is in place
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
    price: 2.65,
    rating: 2.3,
  },
];

const Search = () => {
  const { cookies } = useCustomCookies();

  const searchList = () => {
    const searchItems = cookies[SEARCH_QUERY];
    const searchResult = [];
    searchItems.forEach((query) => {
      const entry = allItems.find((item) => item.name === query);
      searchResult.push(entry);
    });

    if (searchResult.length === 0) {
      return (
        <MuiTypography className="center-text" variant="h3">
          No results found
        </MuiTypography>
      );
    }
    return <MuiGrid gridItems={searchResult} link="item" baseLink="shop" />;
  };

  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container">
        <MuiDivider
          className="divider-header center-text"
          headerText="Search Result"
        />
        {searchList()}
      </MuiBox>
    </Fragment>
  );
};

export default Search;
