import React, { Fragment } from "react";

import NavBar from "../components/NavBar/navbar";
import MuiCarousel from "../components/MaterialUI/mui-carousel";

const ShopPage = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Fragment>
      <NavBar />
      <MuiCarousel carouselItems={items}/>
    </Fragment>
  );
};

export default ShopPage;
