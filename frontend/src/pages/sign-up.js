import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField from "../components/MaterialUI/Form/mui-textfield";
import MuiSelect from "../components/MaterialUI/Form/mui-select";
import CustomButton from "../components/custom-button";

import {
  VALIDATE_REQUIRE,
  VALIDATE_MIN_LENGTH,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../components/Modal/error-modal";

const SignUp = () => {
  const [accountType, setAccountType] = useState("Buyer");
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(
      [
        {
          name: "name",
          value: "",
          isValid: false,
        },
        {
          name: "email",
          value: "",
          isValid: false,
        },
        {
          name: "password",
          value: "",
          isValid: false,
        },
      ],
      false
    );

  const { error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (formValidationState.isValid) {
      const name = formValidationState.inputs.find(
        (input) => input.name === "name"
      ).value;
      const email = formValidationState.inputs.find(
        (input) => input.name === "email"
      ).value;
      const password = formValidationState.inputs.find(
        (input) => input.name === "password"
      ).value;

      if (accountType === "Buyer") {
        await sendRequest(
          "http://localhost:5000/api/user/signUpBuyer",
          "POST",
          {
            name,
            email,
            password,
          }
        );
      } else if (accountType === "Seller") {
        await sendRequest(
          "http://localhost:5000/api/user/signUpSeller",
          "POST",
          {
            name,
            email,
            password,
          }
        );
      }
      if (!error) {
        navigate("/shop");
      }
    }
  };

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);
  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container">
        {!!error && (
          <ErrorModal
            isModalShown={true}
            errorMessage={"User already exists"}
            onClose={clearError}
          />
        )}
        <MuiForm
          formHeader={
            <MuiTypography className="divider-header top-bottom-padding center">
              Sign Up
            </MuiTypography>
          }
          submitHandler={signUpHandler}
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
              label="Email"
              validators={[
                VALIDATE_REQUIRE,
                VALIDATE_MIN_LENGTH,
                VALIDATE_EMAIL,
              ]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "email"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Password"
              validators={[VALIDATE_MIN_LENGTH, VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "password"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiSelect
              classname="top-bottom-margin"
              labelText="Account Type"
              selectItems={["Buyer", "Seller"]}
              defaultValue={accountType}
              onChange={setAccountType}
            />
            <CustomButton
              className="big-btn white-inverse top-bottom-margin"
              onClick={signUpHandler}
            >
              Sign Up
            </CustomButton>
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default SignUp;
