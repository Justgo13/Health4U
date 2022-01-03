import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";

import CustomButton from "../components/custom-button";

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

const Cart = () => {
  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container">
        <MuiTypography className="divider-header center-text">
          Jason's Cart Items
        </MuiTypography>
        <MuiGrid gridItems={items} link="item" baseLink="shop" />
      </MuiBox>

      <MuiBox className="center top-bottom-padding">
      <CustomButton className="xl-button white-inverse">
          Checkout
      </CustomButton>
      </MuiBox>

      
    </Fragment>
  );
};

export default Cart;
