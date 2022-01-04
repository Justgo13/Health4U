import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import "../../../styles/form.css";

const MuiSelect = ({
  labelText,
  selectItems,
  classname,
  defaultValue,
  onChange,
  onChangeParams,
}) => {
  const selectChangeHandler = (e) => {
    if (onChangeParams) {
      onChange(onChangeParams, e.target.value);
    } else {
      onChange(e.target.value);
    }
  
  };

  return (
    <FormControl className={`form-control ${classname}`}>
      <InputLabel>{labelText}</InputLabel>
      <Select
        value={defaultValue}
        label={labelText}
        onChange={selectChangeHandler}
        renderValue={
          defaultValue === 1
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
