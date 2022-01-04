import React, { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import MuiBox from "../../MaterialUI/mui-box";
import MuiImage from "../../MaterialUI/mui-image";
import MuiTypography from "../../MaterialUI/mui-typography";
import MuiSelect from "../../MaterialUI/Form/mui-select";

import CustomButton from "../../custom-button";
import FontAwesomeIcon from "../../font-awesome-icon";
import { useCustomCookies } from "../../../shared/cookies/cookies";

const CartPreviewModalList = ({ cartList }) => {
  const { deleteCartItem, setItemQuantity } = useCustomCookies();

  let quantity = [];

  for (let i = 1; i < 50; i++) {
    quantity.push(i);
  }

  const deleteItemHandler = (id) => deleteCartItem(id);

  return (
    <Fragment>
      {cartList.map((item) => {
        let subTotal = Math.round(item.price * item.quantity * 100) / 100;
        subTotal = subTotal.toFixed(2);

        return (
          <MuiBox key={uuidv4()} className="modal-item">
            <MuiImage
              className="modal-image"
              image={item.image}
              alt={item.name}
            />
            <MuiTypography variant="h6" baseComponent="h2">
              {item.name}
            </MuiTypography>

            <MuiSelect
              classname="form-control-sm"
              labelText="Quantity"
              selectItems={quantity}
              defaultValue={item.quantity}
              onChange={setItemQuantity}
              onChangeParams={item.id}
            />

            <MuiTypography variant="h6" baseComponent="h2">
              {`$${subTotal}`}
            </MuiTypography>

            <CustomButton
              className="white-inverse"
              onClick={() => deleteItemHandler(item.id)}
            >
              <FontAwesomeIcon className="fa-trash" />
            </CustomButton>
          </MuiBox>
        );
      })}
    </Fragment>
  );
};

export default CartPreviewModalList;
