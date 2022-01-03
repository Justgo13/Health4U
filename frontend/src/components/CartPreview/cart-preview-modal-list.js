import React, { Fragment } from "react";
import MuiBox from "../MaterialUI/mui-box";
import MuiImage from "../MaterialUI/mui-image";
import MuiTypography from "../MaterialUI/mui-typography";

const CartPreviewModalList = ({ cartList }) => {
  return (
    <Fragment>
      {cartList.map((item) => {
        let subTotal =
          Math.round(item.productPrice * item.productQuantity * 100) / 100;
        subTotal = subTotal.toFixed(2);

        return (
          <MuiBox className="modal-item">
            <MuiImage
              className="modal-image"
              image={item.productImage}
              alt={item.name}
            />
            <MuiTypography variant="h6" baseComponent="h2">
              {`${item.productName} (${item.productQuantity})`}
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
