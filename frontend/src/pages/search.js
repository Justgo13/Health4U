import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

import { useCartCookies } from "../shared/cookies/cart-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";

const Search = () => {
  const { getSearchQuery } = useCartCookies();

  const { error, isLoading, clearError, sendRequest } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState([]);

  const searchList = () => {
    const searchItems = getSearchQuery(); // searchItems is ["Black mask", "Hand sanitizer", ...]


    // stores query results in set to remove duplicates then push set into list
    let searchSet = new Set();
    let searchResults = [];
    searchItems.forEach((query) => {
      const entry = loadedItems.find((item) => item.name === query);
      searchSet.add(entry);
    });

    for (const queryResult of searchSet) {
      searchResults.push(queryResult);
    }

    if (searchResults.length === 0) {
      return (
        <MuiTypography className="center-text" variant="h3">
          No results found
        </MuiTypography>
      );
    }
    return <MuiGrid gridItems={searchResults} link="item" baseLink="shop" />;
  };

  useEffect(() => {
    const getItems = async () => {
      const res = await sendRequest("http://localhost:5000/api/item/getItems");
      let items = res.items;
      setLoadedItems(items);
    };

    getItems();
  }, [sendRequest]);

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
      {!isLoading && loadedItems.length !== 0 && (
        <MuiBox className="container">
          <MuiDivider
            className="divider-header center-text"
            headerText="Search Result"
          />
          {searchList()}
        </MuiBox>
      )}
    </Fragment>
  );
};

export default Search;
