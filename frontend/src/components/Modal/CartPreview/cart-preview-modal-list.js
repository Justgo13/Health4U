import React, { Fragment } from "react";
import MuiBox from "../../MaterialUI/mui-box";
import MuiImage from "../../MaterialUI/mui-image";
import MuiTypography from "../../MaterialUI/mui-typography";
import {v4 as uuidv4} from "uuid"

const CartPreviewModalList = ({ cartList }) => {
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
            </MuiBox>
          );
        })}
    </Fragment>
  );
};

export default CartPreviewModalList;
