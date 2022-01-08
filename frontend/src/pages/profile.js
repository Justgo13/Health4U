import React, { useState, useEffect, Fragment } from "react";

import Navbar from "../components/NavBar/navbar";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";
import CustomButton from "../components/custom-button";

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
        },
        {
          name: "email",
          value: "",
          isValid: false,
        },
      ],
      false
    );

  const [editFields, setEditFields] = useState(false);

  const editHandler = () => {
    setEditFields(true);
  };

  const saveEditHandler = (e) => {
    e.preventDefault();

    setEditFields(false);

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
          formHeader={
            <MuiTypography className="divider-header top-bottom-padding center">
              Profile details
            </MuiTypography>
          }
        >
          <MuiBox className="grey-background container textfield-group">
            <MuiTextField
              label="Name"
              validators={[VALIDATE_REQUIRE]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "name"
              )}
              updateFormValidationState={updateFormValidationState}
              disabled={!editFields}
              defaultValue={user.name}
              defaultValid
            />
            <MuiTextField
              label="Email"
              validators={[VALIDATE_REQUIRE, VALIDATE_EMAIL]}
              formInput={formValidationState.inputs.find(
                (input) => input.name === "email"
              )}
              updateFormValidationState={updateFormValidationState}
              disabled={!editFields}
              defaultValue={user.email}
              defaultValid
            />

            {!editFields && (
              <CustomButton
                className="big-btn white-inverse top-bottom-margin"
                onClick={editHandler}
              >
                Edit Fields
              </CustomButton>
            )}
            {editFields && (
              <CustomButton
                className="big-btn white-inverse top-bottom-margin"
                onClick={saveEditHandler}
              >
                Save Changes
              </CustomButton>
            )}
          </MuiBox>
        </MuiForm>
      </MuiBox>
    </Fragment>
  );
};

export default Profile;
