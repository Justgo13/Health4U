import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import MuiBox from "../mui-box";

import "../../../styles/form.css";

const MuiSelect = ({ labelText, selectItems, classname, itemQuantity, onChange }) => {
  const selectChangeHandler = e => {
    onChange(e.target.value)
  }

  return (
    <MuiBox className={classname}>
      <FormControl className="form-control">
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
    </MuiBox>
  );
};

export default MuiSelect;
