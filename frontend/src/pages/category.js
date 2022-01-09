import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

import { useHttpClient } from "../shared/hooks/http-hook";

const Category = () => {
  const { categoryName } = useParams();

  const { error, isLoading, clearError, sendRequest } = useHttpClient();
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const getCategoryItems = async () => {
      const res = await sendRequest("http://localhost:5000/api/item/getItems");

      const items = res.items;

      const categoryItems = items.filter(
        (item) => item.category === categoryName
      );

      setCategoryItems(categoryItems);
    };

    getCategoryItems();
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

      <MuiBox className="container">
        <MuiDivider
          className="divider-header center-text"
          headerText={categoryName}
        />
        {isLoading && <LoadingCircle />}
        {!isLoading && (
          <MuiGrid gridItems={categoryItems} link="item" baseLink="shop" />
        )}
      </MuiBox>
    </Fragment>
  );
};

export default Category;
