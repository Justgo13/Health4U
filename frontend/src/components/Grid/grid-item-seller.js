import React from "react";
import { Link } from "react-router-dom";

import { useAuthCookies } from "../../shared/cookies/auth-cookies";
import { useHttpClient } from "../../shared/hooks/http-hook";

import MuiBox from "../MaterialUI/mui-box";

import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";

const GridItemSeller = ({ gridItem, link, onDelete }) => {
  const { getUserInfo } = useAuthCookies();
  const { sendRequest } = useHttpClient();

  const userInfo = getUserInfo();

  const deleteItemHandler = async (sellerID, itemID) => {
    await sendRequest("http://localhost:5000/api/item/deleteItem", "DELETE", {
      sellerID,
      itemID,
    });
    onDelete(itemID);
  };
  return (
    <MuiBox>
      <Link to={link}>
        <CustomButton className="big-btn orange-inverse">
          <FontAwesomeIcon className="fa-edit big-icon" />
        </CustomButton>
      </Link>

      <CustomButton
        className="big-btn white-inverse"
        onClick={() => deleteItemHandler(userInfo.id, gridItem.id)}
      >
        <FontAwesomeIcon className="fa-trash big-icon" />
      </CustomButton>
    </MuiBox>
  );
};

export default GridItemSeller;
