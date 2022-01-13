import React from "react";
import Icon from "@mui/material/Icon";

import "../styles/icon.css";

const FontAwesomeIcon = ({ baseClassName, className, fontSize, onClick }) => {
  return (
    <Icon
      baseClassName={`${baseClassName || "fas"}`}
      className={className}
      sx={{ fontSize: fontSize }}
      onClick={onClick}
    ></Icon>
  );
};

export default FontAwesomeIcon;
