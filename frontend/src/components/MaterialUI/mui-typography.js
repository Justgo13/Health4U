import React from "react";
import { Typography } from "@mui/material";

import "../../styles/text.css";

const MuiTypography = ({className, baseComponent, children, variant, style}) => {
  return (
    <Typography
      className={className || ""}
      component={baseComponent || "h1"}
      variant={variant || "h1"}
      style={style || null}
    >{children}</Typography>
  );
};

export default MuiTypography;
