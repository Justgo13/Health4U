import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTextField from "../components/MaterialUI/Form/mui-textfield";
import MuiSelect from "../components/MaterialUI/Form/mui-select";

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
          validators: [VALIDATE_REQUIRE],
        },
        {
          name: "email",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE, VALIDATE_EMAIL, VALIDATE_MIN_LENGTH],
        },
        {
          name: "password",
          value: "",
          isValid: false,
          validators: [VALIDATE_REQUIRE, VALIDATE_MIN_LENGTH],
        },
      ],
      false
    );

  const { error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (formValidationState.isValid && !error) {
      const formInputs = {};

      formValidationState.inputs.map(
        (input) => (formInputs[input.name] = input.value)
      );

      await sendRequest(
        `http://localhost:5000/api/user/signUp${accountType}`,
        "POST",
        formInputs
      );
      navigate("/shop");
    }
  };

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

      <MuiBox className="container">
        <MuiForm
          formHeader="Sign Up"
          submitHandler={signUpHandler}
          buttonText="Sign Up"
        >
          {formValidationState.inputs.map((input) => (
            <MuiTextField
              key={input.name}
              label={input.name}
              validators={input.validators}
              formInput={input}
              updateFormValidationState={updateFormValidationState}
            />
          ))}

          <MuiSelect
            classname="top-bottom-margin"
            labelText="Account Type"
            selectItems={["Buyer", "Seller"]}
            defaultValue={accountType}
            onChange={setAccountType}
          />
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default SignUp;
