import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_FLOAT,
} from "../components/MaterialUI/Form/mui-textfield";
import CustomButton from "../components/custom-button";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

const SellerEditItem = () => {
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(
      [
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
      ],
      true
    );

  //this is used if the user clicks edit but doesn't edit anything and tries to save changes
  // const originalFormState = [
  //   {
  //     name: "name",
  //     value: "",
  //     isValid: false,
  //   },
  //   {
  //     name: "category",
  //     value: "",
  //     isValid: false,
  //   },
  //   {
  //     name: "description",
  //     value: "",
  //     isValid: false,
  //   },
  //   {
  //     name: "image",
  //     value: "",
  //     isValid: false,
  //   },
  //   {
  //     name: "price",
  //     value: "",
  //     isValid: false,
  //   },
  // ];

  const { itemID } = useParams();
  const navigate = useNavigate();

  const [editFields, setEditFields] = useState(false);

  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const editHandler = (e) => {
    setEditFields(true);
  };

  const { error, sendRequest, isLoading, clearError } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState([]);

  const saveEditHandler = async (e) => {
    e.preventDefault();

    // const isOriginalUnchanged =
    //   formValidationState.inputs.slice().sort().join(",") ===
    //   originalFormState.slice().sort().join(",");
    // if (isOriginalUnchanged || formValidationState.isValid) {
    //   // allow saving if original form input has not been changed or if edited form inputs is valid
    //   setEditFields(false);
    // }

    setEditFields(false);

    if (formValidationState.isValid) {
      const name = formValidationState.inputs.find(
        (input) => input.name === "name"
      ).value;
      const category = formValidationState.inputs.find(
        (input) => input.name === "category"
      ).value;
      const description = formValidationState.inputs.find(
        (input) => input.name === "description"
      ).value;
      const image = formValidationState.inputs.find(
        (input) => input.name === "image"
      ).value;
      const price = formValidationState.inputs.find(
        (input) => input.name === "price"
      ).value;

      await sendRequest("http://localhost:5000/api/item/editItem", "PATCH", {
        itemID,
        name,
        category,
        description,
        image,
        price,
      });
      navigate(`/seller/items/${userInfo.id}`);
    }
  };

  useEffect(() => {
    // pre-populate with existing item information
    const getItemDetails = async () => {
      const res = await sendRequest(
        `http://localhost:5000/api/item/getItem/${itemID}`
      );
      setLoadedItem(res.item);
    };

    getItemDetails();
  }, [sendRequest, itemID]);

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

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
        {isLoading && <LoadingCircle />}
        {!isLoading && loadedItem.length !== 0 && (
          <MuiBox className="container">
            <MuiForm
              formHeader="Item details"
              submitHandler={saveEditHandler}
              buttonText="Save changes"
            >
              {formValidationState.inputs.map((input) => (
                <MuiTextField
                  key={input.name}
                  label={input.name}
                  validators={input.validators}
                  formInput={input}
                  updateFormValidationState={updateFormValidationState}
                  defaultValue={loadedItem[input.name]}
                  defaultValid
                />
              ))}
            </MuiForm>
          </MuiBox>
        )}
      </MuiBox>
    </Fragment>
  );
};

export default SellerEditItem;
