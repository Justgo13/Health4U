import React from "react";
import MuiModal from "../../MaterialUI/mui-modal";
import CartPreviewModalList from "./cart-preview-modal-list";
import CustomButton from "../../custom-button";
import MuiTypography from "../../MaterialUI/mui-typography";

const CartPreviewModal = ({
  isModalShown,
  onClose,
  cartList,
  buttonHandler,
}) => {
  const modalList = () => {
    if (cartList.length === 0) {
      return (
        <MuiTypography className="center-text top-bottom-padding" variant="h5" baseComponent="p">
          Your cart is empty, go add something
        </MuiTypography>
      )
    }
    return (
      <CartPreviewModalList cartList={cartList} />
    )
  };

  return (
    <MuiModal
      open={isModalShown}
      onClose={onClose}
      modalHeader="Cart Preview"
      modalDetails={modalList()}
      modalFooter={
        <CustomButton className="white-inverse big-btn" onClick={buttonHandler}>
          Checkout
        </CustomButton>
      }
    ></MuiModal>
  );
};

export default CartPreviewModal;
