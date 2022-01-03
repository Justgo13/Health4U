import React from "react";
import MuiModal from "../MaterialUI/mui-modal";
import MuiTypography from "../MaterialUI/mui-typography";

const ErrorModal = ({ isModalShown, onClose, errorMessage }) => {
  return (
    <MuiModal
      open={isModalShown}
      onClose={onClose}
      modalHeader="Error"
      modalDetails={
        <MuiTypography
          className="center-text top-bottom-padding"
          variant="h5"
          baseComponent="p"
        >
          {errorMessage}
        </MuiTypography>
      }
    ></MuiModal>
  );
};

export default ErrorModal;
