import React from "react";
import CustomButton from "../../components/custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import MuiBox from "./mui-box";
import MuiSelect from "./Form/mui-select";

import "../../styles/form.css";
import "../../styles/box.css";

const MuiForm = () => {
  const MAX_QUANITY = 50;

  const submitHandler = (e) => {
    e.prevetDefault();
  };

  const quantity = [];

  for (let i = 1; i < MAX_QUANITY; i++) {
    quantity.push(i);
  }

  return (
    <form action="" onSubmit={submitHandler} className="full-height">
      <h3>
        {`$2`}
        <span className="decimal-cost">99</span>
      </h3>
      <MuiBox className="grey-background full-height">
        <MuiSelect labelText="Quantity" selectItems={quantity} />
        <CustomButton className="white-inverse big-btn">
          Add to cart
        </CustomButton>

        <p>
          <FontAwesomeIcon className="fa-shipping-fast small-icon" /> Sold and
          Shipped by Jason
        </p>
        <p>
          <FontAwesomeIcon className="fa-calendar-times small-icon" /> Estimated
          shipping time 1 to 3 days
        </p>
      </MuiBox>
    </form>
  );
};

export default MuiForm;
