import React, { Fragment } from "react";

import Navbar from "../components/NavBar/navbar";
import UserForm from "../components/MaterialUI/Form/user-form";

import MuiBox from "../components/MaterialUI/mui-box";

import {
  VALIDATE_REQUIRE,
  VALIDATE_MIN_LENGTH,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";

const SignUp = () => {
  const initFormState = [
    {
      name: "name",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE],
      type: "text"
    },
    {
      name: "email",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE, VALIDATE_EMAIL, VALIDATE_MIN_LENGTH],
      type: "text"
    },
    {
      name: "password",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE, VALIDATE_MIN_LENGTH],
      type: "password"
    },
  ];

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container">
        <UserForm
          formHeader="Sign Up"
          buttonText="Sign Up"
          initFormState={initFormState}
          signup
        />
      </MuiBox>
    </Fragment>
  );
};

export default SignUp;
