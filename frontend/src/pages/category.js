import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

const Category = () => {
  const { categoryID } = useParams();

  const categoryList = [
    {
      id: "1",
      name: "Masks",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "2",
      name: "Sanitizer",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "3",
      name: "Kits",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "4",
      name: "Kits",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
  ];

  const items = [
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

  const categoryName = categoryList.find(
    (category) => category.id === categoryID
  ).name;
  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container">
        <MuiDivider
          className="divider-header center-text"
          headerText={categoryName}
        />
        <MuiGrid gridItems={items} link="item" baseLink="shop" />
      </MuiBox>
    </Fragment>
  );
};

export default Category;
