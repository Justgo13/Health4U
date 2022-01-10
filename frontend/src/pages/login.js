import React, { Fragment } from "react";

import Navbar from "../components/NavBar/navbar";
import UserForm from "../components/MaterialUI/Form/user-form";

import MuiBox from "../components/MaterialUI/mui-box";

import { VALIDATE_REQUIRE } from "../components/MaterialUI/Form/mui-textfield";

const Login = () => {
  const initFormState = [
    {
      name: "email",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE],
      type: "text"
    },
    {
      name: "password",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE],
      type: "password"
    },
  ];

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container">
        <UserForm
          formHeader="Login"
          buttonText="Login"
          initFormState={initFormState}
          loginUser
        />
      </MuiBox>
    </Fragment>
  );
};

export default Login;
