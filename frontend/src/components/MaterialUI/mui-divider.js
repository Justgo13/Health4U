import React from "react";
import Divider from "@mui/material/Divider";

import "../../styles/text.css"

const MuiDivider = (props) => {
  return (
    <Divider>
      <h3 className={props.className || ""}>{props.headerText}</h3>
    </Divider>
  );
};

export default MuiDivider;
