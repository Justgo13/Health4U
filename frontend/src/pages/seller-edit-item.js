import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";

import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import {
  VALIDATE_REQUIRE,
  VALIDATE_FLOAT,
} from "../components/MaterialUI/Form/mui-textfield";
import ErrorModal from "../components/Modal/error-modal";

import EditForm from "../components/MaterialUI/Form/edit-form";

const SellerEditItem = () => {
  const initFormState = [
    {
      name: "name",
      value: "",
      isValid: true,
      validators: [VALIDATE_REQUIRE],
    },
    {
      name: "category",
      value: "",
      isValid: true,
      validators: [VALIDATE_REQUIRE],
    },
    {
      name: "description",
      value: "",
      isValid: true,
      validators: [VALIDATE_REQUIRE],
    },
    {
      name: "image",
      value: "",
      isValid: true,
      validators: [VALIDATE_REQUIRE],
    },
    {
      name: "price",
      value: "",
      isValid: true,
      validators: [VALIDATE_REQUIRE, VALIDATE_FLOAT],
    },
  ];

  const { itemID } = useParams();

  const { error, sendRequest, isLoading, clearError } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState([]);

  useEffect(() => {
    // pre-populate with existing item information
    const getItemDetails = async () => {
      const res = await sendRequest(
        `/api/item/getItem/${itemID}`
      );
      setLoadedItem(res.item);
    };

    getItemDetails();
  }, [sendRequest, itemID]);

  return (
    <Fragment>
      <Navbar />

      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText="Edit Item" />

        <EditForm
          initFormState={initFormState}
          formHeader="Item Details"
          item
          itemID={itemID}
          defaultValue={loadedItem}
        />
      </MuiBox>
    </Fragment>
  );
};

export default SellerEditItem;
