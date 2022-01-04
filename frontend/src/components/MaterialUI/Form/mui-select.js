import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import MuiBox from "../mui-box";

import "../../../styles/form.css";

const MuiSelect = ({
  labelText,
  selectItems,
  classname,
  itemQuantity,
  onChange,
  onChangeParams,
}) => {
  const selectChangeHandler = (e) => {
    if (onChangeParams) {
      console.log("Call method");
      onChange(onChangeParams, e.target.value);
    }
    onChange(e.target.value);
  };

  return (
    <FormControl className={`form-control ${classname}`}>
      <InputLabel>{labelText}</InputLabel>
      <Select
        value={itemQuantity}
        label={labelText}
        onChange={selectChangeHandler}
        renderValue={
          itemQuantity === 1
            ? () => (
                <MenuItem className="default-quantity" value={1}>
                  1
                </MenuItem>
              )
            : null
        }
      >
        {selectItems.map((item) => (
          <MenuItem key={uuidv4()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
