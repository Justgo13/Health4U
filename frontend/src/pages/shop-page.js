import React, { Fragment, useState } from "react";

import NavBar from "../components/NavBar/navbar";
import MuiCarousel from "../components/MaterialUI/mui-carousel";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiToggleButton from "../components/MaterialUI/mui-toggle-button";

import "../styles/shopPage.css";

const ShopPage = () => {
  const items = [
    {
      name: "Random Name #1",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
  ];

  const categoryList = {
    categories: [
      {
        name: "Masks",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
      },
      {
        name: "Sanitizer",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
      },
      {
        name: "Kits",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
      },
      {
        name: "Kits",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
      },
    ],
  };

  const [isModuleCategories, setIsModuleCategories] = useState(true);

  return (
    <Fragment>
      <NavBar />
      <MuiCarousel carouselItems={items} />
      <div className="container shopPageContainer categories">
        <div className="categories-header">
          <MuiDivider children={<h3>Categories</h3>} />
        </div>
        <div className="categories-body">
          <div className="category-toggle">
            <MuiToggleButton onChange={setIsModuleCategories}/>
           
          </div>
          {isModuleCategories && <MuiGrid categoryList={categoryList} />}
          {!isModuleCategories && <MuiGrid listActive categoryList={categoryList}/>}
        </div>
      </div>
    </Fragment>
  );
};

export default ShopPage;
