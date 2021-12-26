import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const Search = () => {
  return (
    <Autocomplete
      disablePortal
      id="auto-complete"
      options={["jason", "gao"]}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Product Name" />}
    />
  );
};

export default Search;
