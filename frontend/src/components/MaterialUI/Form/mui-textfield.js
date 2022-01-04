import React from "react";
import { TextField } from "@mui/material";

import "../../../styles/sass/mui.sass"

const MuiTextField = ({ defaultValue, label, className }) => {
  return (
    <TextField
      InputProps={{ disableUnderline: true }}
      defaultValue={defaultValue || ""}
      label={label}
      className={`textfield ${className}`}
    />
  );
};

export default MuiTextField;
