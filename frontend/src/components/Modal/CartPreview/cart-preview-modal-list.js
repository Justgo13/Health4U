import React, { Fragment } from "react";
import {v4 as uuidv4} from "uuid"


import MuiBox from "../../MaterialUI/mui-box";
import MuiImage from "../../MaterialUI/mui-image";
import MuiTypography from "../../MaterialUI/mui-typography";
import CustomButton from "../../custom-button";
import FontAwesomeIcon from "../../font-awesome-icon";
import { useCustomCookies } from "../../../shared/cookies/cookies";

const CartPreviewModalList = ({ cartList }) => {
  const {deleteCartItem} = useCustomCookies();

  const deleteItemHandler = (productName) => deleteCartItem(productName)
  return (
    <Fragment>
        {cartList.map((item) => {
          let subTotal =
            Math.round(item.price * item.quantity * 100) / 100;
          subTotal = subTotal.toFixed(2);

          return (
            <MuiBox key={uuidv4()} className="modal-item">
              <MuiImage
                className="modal-image"
                image={item.image}
                alt={item.name}
              />
              <MuiTypography variant="h6" baseComponent="h2">
                {`${item.name} (${item.quantity})`}
              </MuiTypography>

              <MuiTypography variant="h6" baseComponent="h2">
                {`$${subTotal}`}
              </MuiTypography>

              <CustomButton className="white-inverse" onClick={() => deleteItemHandler(item.name)}>
                <FontAwesomeIcon className="fa-trash"/>
              </CustomButton>
            </MuiBox>
          );
        })}
    </Fragment>
  );
};

export default CartPreviewModalList;
