import React, { useReducer } from "react";

const formValidationReducer = (state, action) => {
  let inputs = [...state.inputs];
  switch (action.type) {
    case "UPDATE_VALIDATION":
      // set individual fields isValid and value attribute

      /**
       * inputs look like
       * [
       *  {
       *      name: "email",
       *      value: ""
       *      isValid: false
       *  }
       * ]
       */
      const formInput = action.formInput;
      /**
       * this is formInput
       * {
       *      name: "email",
       *      value: ""
       *      isValid: false
       *  }
       */
      const formInputIndex = inputs.indexOf(formInput);

      // update the isValid and value attribute for the particular form input
      formInput.isValid = action.isValid;
      formInput.value = action.inputValue;
      inputs[formInputIndex] = formInput;
      return {
        ...state,
        inputs,
      };

    case "VALIDATE":
      /**
       * Validates form validity
       */
      let isValid = true;
      for (const input of inputs) {
        isValid = isValid && input.isValid;
      }
      return {
        ...state,
        isValid,
      };
    default:
      return state;
  }
};

export const useFormValidation = (initialFields, initalValidity) => {
  const [formValidationState, dispatch] = useReducer(formValidationReducer, {
    inputs: initialFields,
    isValid: initalValidity,
  });

  const updateFormValidationState = (formInput, isValid, inputValue) =>
    dispatch({
      type: "UPDATE_VALIDATION",
      formInput,
      isValid,
      inputValue,
    });

  const verifyForm = () => {
    dispatch({
      type: "VALIDATE",
    });
  };

  return { formValidationState, updateFormValidationState, verifyForm };
};
