import React from "react";
import MuiForm from "../MaterialUI/mui-form";
import MuiTypography from "../MaterialUI/mui-typography";
import MuiBox from "../MaterialUI/mui-box";
import MuiSelect from "../MaterialUI/Form/mui-select";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";

const PriceForm = ({ submitHandler, cost }) => {
  const quantity = [];

  for (let i = 1; i < 50; i++) {
    quantity.push(i);
  }

  return (
    <MuiForm
      formHeader={
        <MuiTypography className="divider-header">
          <MuiBox>
            ${cost.priceDollar}
            <span className="decimal-cost align-top">{cost.priceCents}</span>
          </MuiBox>
        </MuiTypography>
      }
      submitHandler={submitHandler}
    >
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
    </MuiForm>
  );
};

export default PriceForm;
