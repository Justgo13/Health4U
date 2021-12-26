import React from "react";
import Container from "@mui/material/Container";

import "../../styles/mui.css";

const MuiContainer = (props) => {
  return (
    <Container className={`${props.className}`} maxWidth={`${props.maxWidth}`}>{props.children}</Container>
  );
};

export default MuiContainer;
