import React, { useReducer } from "react";

const modalReducerHandler = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
      };

    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};

export const useModalReducer = ({ showModal }) => {
  const [modalState, dispatch] = useReducer(modalReducerHandler, {
    showModal,
  });
  const showModalHandler = () =>
    dispatch({
      type: "SHOW_MODAL",
    });
  const hideModalHandler = () =>
    dispatch({
      type: "HIDE_MODAL",
    });

  return [modalState, showModalHandler, hideModalHandler];
};
