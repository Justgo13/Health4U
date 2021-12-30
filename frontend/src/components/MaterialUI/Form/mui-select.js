import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import MuiBox from "../mui-box";

import "../../../styles/form.css";

const MuiSelect = ({ labelText, selectItems }) => {
  const [selectedValue, setSelectedValue] = useState();

  const selectChangeHandler = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <MuiBox>
      <FormControl className="form-control">
        <InputLabel>{labelText}</InputLabel>
        <Select
          value={selectedValue}
          label={labelText}
          onChange={selectChangeHandler}
          placeholder="1"
        >
          {selectItems.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </MuiBox>
  );
};

export default MuiSelect;
