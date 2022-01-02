import React from "react";
import CustomButton from "../../components/custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import MuiBox from "./mui-box";
import MuiSelect from "./Form/mui-select";
import MuiTypography from "./mui-typography";

import "../../styles/form.css";

const MuiForm = ({ submitHandler, formHeader }) => {
  const MAX_QUANITY = 50;
  const quantity = [];

  for (let i = 1; i < MAX_QUANITY; i++) {
    quantity.push(i);
  }

  return (
    <form action="" onSubmit={submitHandler}>
      <MuiTypography className="divider-header">{formHeader}</MuiTypography>
      <MuiBox className="grey-background top-bottom-padding">
        <MuiSelect
          classname="top-bottom-padding"
          labelText="Quantity"
          selectItems={quantity}
        />
        <CustomButton className="white-inverse big-btn" type="submit">
          Add to cart
        </CustomButton>

        <MuiTypography variant="p" baseComponent="p">
          <FontAwesomeIcon className="fa-shipping-fast small-icon" /> Sold and
          Shipped by Jason
        </MuiTypography>
        <MuiTypography variant="p" baseComponent="p">
          <FontAwesomeIcon className="fa-calendar-times small-icon" /> Estimated
          shipping time 1 to 3 days
        </MuiTypography>
      </MuiBox>
    </form>
  );
};

export default MuiForm;
