import React, { Fragment } from "react";
import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiDivider from "../components/MaterialUI/mui-divider";

import CustomButton from "../components/custom-button";
import { getOrderSummary } from "../shared/cookies/cart-cookie-handlers";

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
  const { subTotal, taxes, total } = getOrderSummary();

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container item-desc no-bottom-padding">
        <MuiDivider headerText="Order Summary" />
        <MuiBox className="no-bottom-padding">
          <MuiTypography
            variant="p"
            baseComponent="p"
          >{`Sub Total -> $${subTotal}`}</MuiTypography>
          <MuiTypography
            variant="p"
            baseComponent="p"
          >{`HST & GST -> $${taxes}`}</MuiTypography>
          <MuiTypography
            variant="p"
            baseComponent="p"
          >{`Order Total -> $${total}`}</MuiTypography>
        </MuiBox>
      </MuiBox>

      <MuiBox className="container">
        <MuiDivider headerText={`${"Jason's"} Cart`} />
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
