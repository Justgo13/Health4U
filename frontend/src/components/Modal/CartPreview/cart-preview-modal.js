import React from "react";
import MuiModal from "../../MaterialUI/mui-modal";
import CartPreviewModalList from "./cart-preview-modal-list";
import CustomButton from "../../custom-button";

const CartPreviewModal = ({
  isModalShown,
  onClose,
  cartList,
  buttonHandler,
}) => {
  return (
    <MuiModal
      open={isModalShown}
      onClose={onClose}
      modalHeader="Cart Preview"
      modalDetails={<CartPreviewModalList cartList={cartList} />}
      modalFooter={
        <CustomButton className="white-inverse big-btn" onClick={buttonHandler}>
          Checkout
        </CustomButton>
      }
    ></MuiModal>
  );
};

export default CartPreviewModal;
