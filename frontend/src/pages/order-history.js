import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar/navbar";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiTypography from "../components/MaterialUI/mui-typography";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";
import {v4 as uuidv4} from "uuid"
 
// import { useCartCookies } from "../shared/cookies/cart-cookies";
import { useAuthCookies } from "../shared/cookies/auth-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";

const OrderHistory = () => {
  // const { addItemByOrderDate, getCartItemOrderDate } = useCartCookies();
  // const itemsByOrderDate = getCartItemOrderDate();
  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const [loadedCartHistory, setLoadedCartHistory] = useState([]);

  useEffect(() => {
    // addItemByOrderDate();
    const getCartHistory = async () => {
      const res = await sendRequest(
        `http://localhost:5000/api/user/getCartHistory/${userInfo.id}`
      );

      setLoadedCartHistory(res.cart)
    };
    getCartHistory();
  }, [sendRequest, userInfo]);
  return (
    <Fragment>
      <Navbar />
      <MuiBox className="container top-padding">
        {!!error && (
          <ErrorModal
            isModalShown={true}
            errorMessage={error}
            onClose={clearError}
          />
        )}
        <MuiDivider headerText="Order History" />
        {isLoading && <LoadingCircle/>}
        {loadedCartHistory.map((item) => {
          const orderDate = item.orderDate;
          const cartItems = item.cartItems;

          return (
            <MuiBox key={uuidv4()}>
              <MuiTypography variant="h3" className="red-text">
                {orderDate}
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
