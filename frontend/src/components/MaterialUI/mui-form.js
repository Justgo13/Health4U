import React from "react";
import MuiBox from "./mui-box";
import MuiTypography from "./mui-typography";
import CustomButton from "../custom-button";

const MuiForm = (props) => {
  return (
    <form action="" onSubmit={props.submitHandler}>
      <MuiBox className="form-header">
        <MuiTypography className="divider-header top-bottom-padding center">
          {props.formHeader}
        </MuiTypography>
      </MuiBox>
      <MuiBox className="form-content">
        <MuiBox className={`grey-background container textfield-group ${props.contentClassName}`}>
          {props.children}
          <CustomButton className="big-btn white-inverse top-bottom-margin">
            {props.buttonText}
          </CustomButton>
        </MuiBox>
      </MuiBox>
    </form>
  );
};

export default MuiForm;
