import React, { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import MuiTextField from "./mui-textfield";
import MuiForm from "../mui-form";

import LoadingCircle from "../../loading-circle";

import { useFormValidation } from "./form-validation";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useAuthCookies } from "../../../shared/cookies/auth-cookies";

const EditForm = ({
  initFormState,
  formHeader,
  item,
  profile,
  itemID,
  defaultValue,
}) => {
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(initFormState, true);

  const { sendRequest, isLoading } = useHttpClient();
  const navigate = useNavigate();
  const { updateUserInfo, getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const saveEditHandler = async (e) => {
    e.preventDefault();

    if (formValidationState.isValid) {
      const formInputs = {};

      formValidationState.inputs.map(
        (input) => (formInputs[input.name] = input.value)
      );

      if (item) {
        await sendRequest("http://localhost:5000/api/item/editItem", "PATCH", {
          itemID,
          ...formInputs,
        });
        navigate(`/seller/items/${userInfo.id}`);
      } else if (profile) {
        // send request to edit user in backend
        await sendRequest("http://localhost:5000/api/user/editUser", "PATCH", {
          userID: userInfo.id,
          ...formInputs,
        });
        updateUserInfo({
          ...userInfo,
          ...formInputs,
          accountType: userInfo.accountType,
        });
      }
    }
  };

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

  return (
    <Fragment>
      {isLoading && <LoadingCircle />}
      {!isLoading && defaultValue.length !== 0 && (
        <MuiForm
          formHeader={formHeader}
          submitHandler={saveEditHandler}
          buttonText="Save changes"
        >
          {formValidationState.inputs.map((input) => (
            <MuiTextField
              key={input.name}
              label={input.name}
              validators={input.validators}
              formInput={input}
              updateFormValidationState={updateFormValidationState}
              defaultValue={defaultValue[input.name]}
              defaultValid
            />
          ))}
        </MuiForm>
      )}
    </Fragment>
  );
};

export default EditForm;
