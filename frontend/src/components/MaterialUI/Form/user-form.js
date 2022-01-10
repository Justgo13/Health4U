import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../../Modal/error-modal";

import MuiForm from "../mui-form";
import MuiTextField from "./mui-textfield";
import MuiSelect from "./mui-select";

import { useFormValidation } from "./form-validation";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useAuthCookies } from "../../../shared/cookies/auth-cookies";

const UserForm = ({ formHeader, buttonText, initFormState, loginUser, signup }) => {
  const [accountType, setAccountType] = useState("Buyer");
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(initFormState, false);

  const navigate = useNavigate();
  const { error, sendRequest, clearError } = useHttpClient();
  const { updateUserInfo, login } = useAuthCookies();

  const addUserHandler = async (e) => {
    e.preventDefault();
    if (formValidationState.isValid && !error) {
      const formInputs = {};

      formValidationState.inputs.map(
        (input) => (formInputs[input.name] = input.value)
      );

      if (loginUser) {
        let res;
        res = await sendRequest(
          "/api/user/login",
          "POST",
          {
            ...formInputs,
            accountType,
          }
        );

        const user = res.user;
        updateUserInfo({
          id: user.id,
          name: user.name,
          email: user.email,
          accountType: user.accountType,
        });
        login();
      } else if (signup) {
        await sendRequest(
          `/api/user/signUp${accountType}`,
          "POST",
          formInputs
        );
      }

      navigate("/shop");
    }
  };

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);
  return (
    <MuiForm
      formHeader={formHeader}
      submitHandler={addUserHandler}
      buttonText={buttonText}
    >
      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}
      {formValidationState.inputs.map((input) => (
        <MuiTextField
          key={input.name}
          label={input.name}
          validators={input.validators}
          formInput={input}
          updateFormValidationState={updateFormValidationState}
          type={input.type}
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
  );
};

export default UserForm;
