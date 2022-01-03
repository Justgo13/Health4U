import React, { useReducer } from "react";

const modalReducerHandler = (state, action) => {
  switch (action.type) {
    case "SHOW_CART_MODAL":
      return {
        ...state,
        isCartModalShown: true,
      };

    case "HIDE_CART_MODAL":
      return {
        ...state,
        isCartModalShown: false,
      };

    case "SHOW_SEARCH_ERROR_MODAL":
      return {
        ...state,
        isSearchErrorModalShown: true,
      };

    case "HIDE_SEARCH_ERROR_MODAL":
      return {
        ...state,
        isSearchErrorModalShown: false,
      };
    default:
      return state;
  }
};

export const useModalReducer = ({
  isCartModalShown,
  isSearchErrorModalShown,
}) => {
  const [modalState, dispatch] = useReducer(modalReducerHandler, {
    isCartModalShown,
    isSearchErrorModalShown,
  });
  const showCartModal = () =>
    dispatch({
      type: "SHOW_CART_MODAL",
    });
  const hideCartModal = () =>
    dispatch({
      type: "HIDE_CART_MODAL",
    });

  const showSearchErrorModal = () =>
    dispatch({
      type: "SHOW_SEARCH_ERROR_MODAL",
    });
  const hideSearchErrorModal = () =>
    dispatch({
      type: "HIDE_SEARCH_ERROR_MODAL",
    });

  return [
    modalState,
    showCartModal,
    hideCartModal,
    showSearchErrorModal,
    hideSearchErrorModal,
  ];
};
