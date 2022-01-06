import React, { Fragment, useState, useEffect } from "react";

import Navbar from "../components/NavBar/navbar";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useAuthCookies } from "../shared/cookies/auth-cookies";
import CustomButton from "../components/custom-button";

const SellerProfile = ({user, items}) => {
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

  //this is used if the user clicks edit but doesn't edit anything and tries to save changes
  const originalFormState = [
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
  ];

  const [editFields, setEditFields] = useState(false);

  const editHandler = (e) => {
    e.preventDefault();
    setEditFields(true);
  };

  const { updateUserInfo } = useAuthCookies();
  const saveEditHandler = (e) => {
    e.preventDefault();

    const isOriginalUnchanged =
      formValidationState.inputs.slice().sort().join(",") ===
      originalFormState.slice().sort().join(",");
    if (isOriginalUnchanged || formValidationState.isValid) {
      // allow saving if original form input has not been changed or if edited form inputs is valid
      setEditFields(false);
    }

    if (formValidationState.isValid) {
      const email = formValidationState.inputs.find(
        (item) => item.name === "email"
      );
      updateUserInfo({
        name: "Jason",
        email: email.value,
        accountType: "Seller",
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

export default SellerProfile;
