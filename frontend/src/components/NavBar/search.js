import React, { Fragment, useEffect, useState } from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import LoadingCircle from "../loading-circle";
import ErrorModal from "../Modal/error-modal";

import { useCartCookies } from "../../shared/cookies/cart-cookies";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Search = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [searchOptions, setSearchOptions] = useState([]);

  const { onSearchQueryCookieChange } = useCartCookies();

  const { error, isLoading, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getItems = async () => {
      const res = await sendRequest("http://localhost:5000/api/item/getItems");
      let items = res.items;

      let itemNames = items.map((i) => i.name);
      setSearchOptions(itemNames);
    };

    getItems();
  }, [sendRequest]);

  return (
    <Fragment>
      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {isLoading && <LoadingCircle />}
      {!isLoading && searchOptions && (
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
      )}
    </Fragment>
  );
};

export default Search;
