import React, { useState } from "react";

import MuiCarousel from "../components/MaterialUI/mui-carousel";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiToggleButton from "../components/MaterialUI/mui-toggle-button";
import MuiBox from "../components/MaterialUI/mui-box";

import "../styles/shopPage.css";

const ShopPage = () => {
  const items = [
    {
      id: "1",
      name: "Random Name #1",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "2",
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "3",
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "4",
      name: "Random Name #2",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
  ];

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

  return (
    <MuiBox>
      <MuiCarousel carouselItems={items} />
      <MuiBox className="container">
        <MuiDivider children={<h3>Categories</h3>} />
        <MuiGrid gridItems={categoryList} />
      </MuiBox>
    </MuiBox>
  );
};

export default ShopPage;
