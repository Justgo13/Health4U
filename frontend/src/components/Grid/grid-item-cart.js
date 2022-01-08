import React from "react";

import MuiBox from "../MaterialUI/mui-box";
import MuiSelect from "../MaterialUI/Form/mui-select";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import { quantity } from "../../utils/quantityDropdown";
import { useCartCookies } from "../../shared/cookies/cart-cookies";

const GridItemCart = ({ gridItem }) => {
  const { setItemQuantity, deleteItemHandler } = useCartCookies();
  return (
    <MuiBox className="container center">
      <MuiBox className="flex-child">
        <CustomButton
          className="big-btn white-inverse"
          onClick={() => deleteItemHandler(gridItem.id)}
        >
          <FontAwesomeIcon className="fa-trash big-icon" />
        </CustomButton>
      </MuiBox>
      <MuiBox className="flex-child">
        <MuiSelect
          classname="top-bottom-margin full-width"
          labelText="Quantity"
          selectItems={quantity}
          defaultValue={gridItem.quantity}
          onChange={setItemQuantity}
          onChangeParams={gridItem.id}
        />
      </MuiBox>
    </MuiBox>
  );
};

export default GridItemCart;
