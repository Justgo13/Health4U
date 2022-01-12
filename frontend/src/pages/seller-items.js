import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";



import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";

import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";
import CustomButton from "../components/custom-button";
import FontAwesomeIcon from "../components/font-awesome-icon";
import Navbar from "../components/NavBar/navbar";
import RoundAddBtn from "../components/round-add-btn";


const SellerItems = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedSellerItems, setLoadedSellerItems] = useState([]);
  const { getUserInfo } = useAuthCookies();

  const userInfo = getUserInfo();
  const userID = userInfo.id;

  useEffect(() => {
    const getSellerItems = async () => {
      const res1 = await sendRequest(
        `/api/user/getSellerItems/${userID}`
      );
      const res2 = await sendRequest(
        "/api/item/resolveItemIds",
        "POST",
        { itemIDs: res1.items }
      );
      setLoadedSellerItems(res2.resolvedItems);
    };

    getSellerItems();
  }, [sendRequest, userID]);

  const onDelete = (deletedID) => {
      setLoadedSellerItems(loadedSellerItems.filter(item => item.id !== deletedID))
  }
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

      {isLoading && <LoadingCircle />}
      {!isLoading && (
        <MuiBox>
          <MuiBox className="container top-padding">
            <MuiDivider
              className="divider-header center-text"
              headerText="My Items"
            />
            <MuiGrid
              gridItems={loadedSellerItems}
              link="item"
              baseLink="shop"
              seller
              onDelete={onDelete}
              noButton
            />
          </MuiBox>
          <RoundAddBtn link="/seller/item/addItem"/>
        </MuiBox>
      )}
    </Fragment>
  );
};

export default SellerItems;
