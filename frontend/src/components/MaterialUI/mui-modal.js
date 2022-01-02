import React from "react";
import { Modal, Typography, Box, CardMedia } from "@mui/material";
import MuiBox from "./mui-box";
import { v4 as uuidv4 } from "uuid";

import "../../styles/image.css";

const MuiModal = ({ isModalShown, onClose, modalHeader, modalContent }) => {
  const cartItems = modalContent.cartItems;
  return (
    <Modal
      open={isModalShown}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MuiBox className="modal-box">
        <MuiBox className="modal-header">
          <Typography variant="h6" component="h2">
            {modalHeader}
          </Typography>
        </MuiBox>

        <MuiBox className="modal-details">
          {cartItems.map((item) => {
            const subTotal =
              Math.round(item.productBasePrice * item.cartCount * 100) / 100;
            return (
              <MuiBox key={uuidv4()} className="modal-item">
                <CardMedia
                  className="modal-image"
                  component="img"
                  image={item.productImage}
                  alt={item.name}
                />
                <Typography variant="h6" component="h2">
                  {`${item.productName} (${item.cartCount})`}
                </Typography>

                <Typography variant="h6" component="h2">
                  {`$${subTotal}`}
                </Typography>
              </MuiBox>
            );
          })}
        </MuiBox>
      </MuiBox>
    </Modal>
  );
};

export default MuiModal;
