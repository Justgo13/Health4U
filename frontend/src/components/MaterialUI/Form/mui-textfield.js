import React, { useReducer, useState, useEffect } from "react";
import { TextField } from "@mui/material";

import "../../../styles/sass/mui.sass";

export const VALIDATE_REQUIRE = "validate_require";
export const VALIDATE_MIN_LENGTH = "validate_min_length";
export const VALIDATE_EMAIL = "validate_email";
export const VALIDATE_FLOAT = "validate_float";

const MIN_LENGTH = 6;

const inputReducer = (state, action) => {
  /**
   * Validates the input based on the type of validations specified in action.validators
   */
  let isValid = true;
  for (const validator of action.validators) {
    if (validator === VALIDATE_REQUIRE) {
      isValid = isValid && action.input !== "";
    }
    if (validator === VALIDATE_MIN_LENGTH) {
      isValid = isValid && action.input.length >= MIN_LENGTH;
    }
    if (validator === VALIDATE_EMAIL) {
      isValid = isValid && !!action.input.toLowerCase().match(/^\S+@\S+\.\S+$/);
    }
    if (validator === VALIDATE_FLOAT) {
      isValid = isValid && !!action.input.match(/^[0-9]*\.[0-9]+/)
    }
  }

  return {
    ...state,
    isValid,
    input: action.input,
  };
};

const MuiTextField = ({
  defaultValue,
  label,
  className,
  validators,
  formInput,
  updateFormValidationState,
  disabled,
}) => {
  const [error, setError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    input: defaultValue || "",
    isValid: false,
    validators: validators || [],
  });

  useEffect(() => {
    if (isTouched) {
      // only check error if the field has been clicked on
      setError(!inputState.isValid);
    }
    // whenever text field is clicked on or changed, update form validation state
    updateFormValidationState(formInput, inputState.isValid, inputState.input);
  }, [isTouched, formInput, inputState.isValid, inputState.input]);

  const onFieldChange = (e) => {
    dispatch({
      validators,
      input: e.target.value,
    });
  };

  const touchHandler = () => {
    setIsTouched(true);
  };

  return (
    <TextField
      defaultValue={defaultValue || ""}
      label={label}
      className={`textfield ${className}`}
      onChange={onFieldChange}
      onBlur={touchHandler}
      error={error}
      disabled={disabled}
    />
  );
};

export default MuiTextField;
