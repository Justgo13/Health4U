import React, { useEffect, Fragment } from "react";

import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";

import Navbar from "../components/NavBar/navbar";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Profile = () => {
  const { updateUserInfo, getUserInfo } = useAuthCookies();
  const user = getUserInfo();

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
          validators: [VALIDATE_REQUIRE, VALIDATE_EMAIL],
        },
      ],
      false
    );

  const saveEditHandler = (e) => {
    e.preventDefault();

    if (formValidationState.isValid) {
      const name = formValidationState.inputs.find(
        (item) => item.name === "name"
      ).value;
      const email = formValidationState.inputs.find(
        (item) => item.name === "email"
      ).value;
      updateUserInfo({
        name,
        email,
        accountType: user.accountType,
      });
    }
  };

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText={`${user.name}'s Profile`} />
      </MuiBox>

      <MuiBox className="container">
        <MuiForm
          formHeader="Profile details"
          submitHandler={saveEditHandler}
          buttonText={"Save changes"}
        >
          <MuiBox className="grey-background container textfield-group">
            {formValidationState.inputs.map((input) => (
              <MuiTextField
                key={input.name}
                label={input.name}
                validators={input.validators}
                formInput={input}
                updateFormValidationState={updateFormValidationState}
                defaultValue={user[input.name]}
                defaultValid
              />
            ))}
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default Profile;
