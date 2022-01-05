import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar/navbar";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField from "../components/MaterialUI/Form/mui-textfield";
import CustomButton from "../components/custom-button";

import { VALIDATE_REQUIRE } from "../components/MaterialUI/Form/mui-textfield";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Login = () => {
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

  const loginHandler = (e) => {
    e.preventDefault();
    if (formValidationState.isValid) {
      const email = formValidationState.inputs.find(
        (item) => item.name === "email"
      );
      login();
      updateUserInfo({ name: "Jason", email: email.value, accountType: "Buyer" });
      navigate("/shop");
    }
  };

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container">
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
