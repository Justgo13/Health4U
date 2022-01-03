import React from "react";
import { Modal, Typography } from "@mui/material";
import MuiBox from "./mui-box";

const MuiModal = ({
  open,
  onClose,
  modalHeader,
  modalDetails,
  modalFooter,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <MuiBox className="modal-box">
        <MuiBox className="modal-header">
          <Typography variant="h6" component="h2">
            {modalHeader}
          </Typography>
        </MuiBox>

        <MuiBox className="modal-details">{modalDetails}</MuiBox>

        <MuiBox className="modal-footer">{modalFooter}</MuiBox>
      </MuiBox>
    </Modal>
  );
};

export default MuiModal;
