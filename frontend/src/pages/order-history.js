import React, { Fragment, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiTypography from "../components/MaterialUI/mui-typography";

import { useCartCookies } from "../shared/cookies/cart-cookies";

const OrderHistory = () => {
  const { addItemByOrderDate, getCartItemOrderDate } = useCartCookies();
  const itemsByOrderDate = getCartItemOrderDate();
  useEffect(() => {
    addItemByOrderDate();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container top-padding">
        <MuiDivider headerText="Order History" />

        {itemsByOrderDate.map((item) => {
          const orderDate = item.orderDate;
          const orderItems = item.orderItems;

          return (
            <MuiBox>
              <MuiTypography variant="h3" className="red-text">
                {orderDate}
              </MuiTypography>
              <MuiGrid gridItems={orderItems} link="item" baseLink="shop" />
            </MuiBox>
          );
        })}
      </MuiBox>
    </Fragment>
  );
};

export default OrderHistory;
