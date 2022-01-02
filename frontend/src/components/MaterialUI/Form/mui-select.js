import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import MuiBox from "../mui-box";
import { useQuantityContext } from "../../../shared/context/consumer/quantity-consumer";

import "../../../styles/form.css";

const MuiSelect = ({ labelText, selectItems, classname }) => {
  const quantityContext = useQuantityContext();

  useEffect(() => {
    // set quantity to default value 1
    quantityContext.onQuantityChange(1);
  }, []);

  const selectChangeHandler = (e) => {
    quantityContext.onQuantityChange(e.target.value);
  };
  return (
    <MuiBox className={classname}>
      <FormControl className="form-control">
        <InputLabel>{labelText}</InputLabel>
        <Select
          value={quantityContext.quantity}
          label={labelText}
          onChange={selectChangeHandler}
          renderValue={
            quantityContext.quantity === 1
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
