import React from "react";
import Divider from "@mui/material/Divider";

const MuiDivider = (props) => {
  return <Divider children={props.children} className={`${props.className}`} />;
};

export default MuiDivider;
