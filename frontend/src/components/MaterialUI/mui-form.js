import React from "react";
import MuiBox from "./mui-box";

const MuiForm = (props) => {
  return (
    <form action="" onSubmit={props.submitHandler}>
      <MuiBox className="form-header">{props.formHeader}</MuiBox>
      <MuiBox className="form-content">{props.children}</MuiBox>
    </form>
  );
};

export default MuiForm;
