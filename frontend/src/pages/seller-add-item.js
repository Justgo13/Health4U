import React, { Fragment, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../components/Modal/error-modal";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import MuiForm from "../components/MaterialUI/mui-form";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_FLOAT,
} from "../components/MaterialUI/Form/mui-textfield";
import MuiBox from "../components/MaterialUI/mui-box";

const SellerAddItem = () => {
  const navigate = useNavigate();

  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(
      [
        {
          name: "name",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE],
        },
        {
          name: "category",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE],
        },
        {
          name: "description",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE],
        },
        {
          name: "image",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE],
        },
        {
          name: "price",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE, VALIDATE_FLOAT],
        },
      ],
      false
    );

  const { error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

  const addItemHandler = async (e) => {
    e.preventDefault();

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
      await sendRequest("http://localhost:5000/api/item/addItem", "POST", {
        sellerID: userInfo.id,
        name,
        category,
        description,
        image,
        price,
      });
      navigate(`/seller/items/${userInfo.id}`);
    }
  };
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

      <MuiBox className="container">
        <MuiForm
          formHeader="Add Item"
          buttonText="Add Item"
          submitHandler={addItemHandler}
        >
          <MuiBox className="grey-background container textfield-group">
            {formValidationState.inputs.map((input) => (
              <MuiTextField
                key={input.name}
                label={input.name}
                validators={input.validators}
                formInput={input}
                updateFormValidationState={updateFormValidationState}
              />
            ))}
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default SellerAddItem;