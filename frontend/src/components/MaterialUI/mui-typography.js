import React from "react";
import { Typography } from "@mui/material";

import "../../styles/text.css";

const MuiTypography = ({className, baseComponent, children}) => {
  return (
    <Typography
      className={className || ""}
      component={baseComponent || "h1"}
      variant="h6"
    >{children}</Typography>
  );
};

export default MuiTypography;
