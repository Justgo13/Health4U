import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useCartCookies } from "../../shared/cookies/cart-cookies";

const Search = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const searchOptions = ["Black mask", "Pink mask"];

  const { onSearchQueryCookieChange } = useCartCookies();

  return (
    <Autocomplete
      multiple
      id="auto-complete"
      options={searchOptions}
      disableCloseOnSelect
      limitTags={2}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Search" />}
      onChange={(e, values) => {
        onSearchQueryCookieChange(values);
      }}
    />
  );
};

export default Search;
