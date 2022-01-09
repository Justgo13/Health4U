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

  // const categoryList = [
  //   {
  //     id: "1",
  //     name: "Masks",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //   },
  //   {
  //     id: "2",
  //     name: "Sanitizer",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //   },
  //   {
  //     id: "3",
  //     name: "Kits",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //   },
  //   {
  //     id: "4",
  //     name: "Kits",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //   },
  // ];

  // const items = [
  //   {
  //     id: "1",
  //     name: "Black mask",
  //     category: "mask",
  //     description: "Black facial mask",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //     price: 2.12,
  //     rating: 2.2,
  //   },
  //   {
  //     id: "2",
  //     name: "Pink mask",
  //     category: "mask",
  //     description: "Pink facial mask",
  //     image:
  //       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  //     price: 2.65,
  //     rating: 2.3,
  //   },
  // ];

  const { error, isLoading, clearError, sendRequest } = useHttpClient();
  const [categoryItems, setCategoryItems] = useState([]);

  // const categoryName = categoryList.find(
  //   (category) => category.id === categoryID
  // ).name;

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
        {!isLoading && <MuiGrid gridItems={categoryItems} link="item" baseLink="shop" />}
      </MuiBox>
    </Fragment>
  );
};

export default Category;
