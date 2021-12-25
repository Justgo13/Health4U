import React from "react";
import Button from "@mui/material/Button";

import "../styles/button.css";

const CustomButton = (props) => {
  return (
    <Button
      variant={`${props.variant || "contained"}`}
      className={props.className}
      size={`${props.size || "medium"}`}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
