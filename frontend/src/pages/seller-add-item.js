import React, { Fragment, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../components/Modal/error-modal";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_FLOAT,
} from "../components/MaterialUI/Form/mui-textfield";
import MuiBox from "../components/MaterialUI/mui-box";
import CustomButton from "../components/custom-button";

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
        },
        {
          name: "category",
          value: "",
          isValid: false,
        },
        {
          name: "description",
          value: "",
          isValid: false,
        },
        {
          name: "image",
          value: "",
          isValid: false,
        },
        {
          name: "price",
          value: "",
          isValid: false,
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

      <MuiBox className="container">
        {!!error && (
          <ErrorModal
            isModalShown={true}
            errorMessage={error}
            onClose={clearError}
          />
        )}
        <MuiForm
          formHeader={
            <MuiTypography className="divider-header top-bottom-padding center">
              Add Item
            </MuiTypography>
          }
          submitHandler={addItemHandler}
        >
          <MuiBox className="grey-background container textfield-group">
            <MuiTextField
              label="Name"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "name"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Category"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "category"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Description"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "description"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Image URL"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "image"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Price ($)"
              validators={[VALIDATE_REQUIRE, VALIDATE_FLOAT]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "price"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <CustomButton
              className="big-btn white-inverse top-bottom-margin"
              onClick={addItemHandler}
            >
              Add Item
            </CustomButton>
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default SellerAddItem;
