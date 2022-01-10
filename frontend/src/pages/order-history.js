import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar/navbar";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiTypography from "../components/MaterialUI/mui-typography";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";
import { v4 as uuidv4 } from "uuid";

import { useAuthCookies } from "../shared/cookies/auth-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";

const OrderHistory = () => {
  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const [loadedCartHistory, setLoadedCartHistory] = useState([]);

  useEffect(() => {
    const getCartHistory = async () => {

      // get the buyer's cart history
      let res = await sendRequest(
        `/api/user/getCartHistory/${userInfo.id}`
      );

      // cartHistory is [{cartItems: ["1",...], orderDate: "Jan 2, 2020"}]
      let cartHistory = res.cart;

      // for each cart we use Promise.all to wait for all the promises
      // created in each iteration to resolve
      cartHistory = await Promise.all(cartHistory.map(async(order) => {
        let cartItems = order.cartItems; // cartItems looks like {cartItems: ["1", "2", ...] }

        // turn each item id in cartItems into a item object
        cartItems = await Promise.all(cartItems.map(async(itemID) => {
          let res = await sendRequest(`/api/item/getItem/${itemID}`);
          let item = res.item;
          return item
        }))

        // cart items looks like {cartItems: [{name, category, description, image, rating}, ...]}
        return {...order, cartItems}
      }));


      // cartHistory becomes [{cartItems: [{name, category, description, image, rating}, ...], orderDate: "Jan 2, 2020"}]
      setLoadedCartHistory(cartHistory);
    };
    getCartHistory();
  }, [sendRequest, userInfo]);

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
      <MuiBox className="container top-padding">
        <MuiDivider headerText="Order History" />
        {isLoading && <LoadingCircle />}
        {loadedCartHistory.map((item) => {
          const orderDate = item.orderDate;
          const cartItems = item.cartItems;
          const orderTotal = item.total;

          return (
            <MuiBox key={uuidv4()}>
              <MuiTypography variant="h3" className="red-text">
                {orderDate} - ${orderTotal}
              </MuiTypography>
              <MuiGrid gridItems={cartItems} link="item" baseLink="shop" />
            </MuiBox>
          );
        })}
      </MuiBox>
    </Fragment>
  );
};

export default OrderHistory;
