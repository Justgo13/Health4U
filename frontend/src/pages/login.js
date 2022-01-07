import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField from "../components/MaterialUI/Form/mui-textfield";
import MuiSelect from "../components/MaterialUI/Form/mui-select";
import CustomButton from "../components/custom-button";

import { VALIDATE_REQUIRE } from "../components/MaterialUI/Form/mui-textfield";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../components/Modal/error-modal";

const Login = () => {
  const [accountType, setAccountType] = useState("Buyer");
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(
      [
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

  const navigate = useNavigate();

  const { login, updateUserInfo } = useAuthCookies();
  const { error, clearError, sendRequest } = useHttpClient();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (formValidationState.isValid) {
      const email = formValidationState.inputs.find(
        (item) => item.name === "email"
      ).value;
      const password = formValidationState.inputs.find(
        (input) => input.name === "password"
      ).value;

      let res;
      res = await sendRequest("http://localhost:5000/api/user/login", "POST", {
        email,
        password,
        accountType,
      });

      if (!error) {
        const user = res.user;
        updateUserInfo({
          id: user.id,
          name: user.name,
          email: user.email,
          accountType: user.accountType,
        });
        login();
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
            errorMessage={error}
            onClose={clearError}
          />
        )}
        <MuiForm
          formHeader={
            <MuiTypography className="divider-header top-bottom-padding center">
              Login
            </MuiTypography>
          }
          submitHandler={loginHandler}
        >
          <MuiBox className="grey-background container textfield-group">
            <MuiTextField
              label="Email"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "email"
              )}
              updateFormValidationState={updateFormValidationState}
            />
            <MuiTextField
              label="Password"
              validators={[VALIDATE_REQUIRE]}
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
              onClick={loginHandler}
            >
              Login
            </CustomButton>
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default Login;
