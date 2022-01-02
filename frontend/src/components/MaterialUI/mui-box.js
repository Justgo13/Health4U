import React from "react";
import Box from "@mui/material/Box";

import "../../styles/box.css";

const MuiBox = (props) => {
  return (
    <Box style={props.style || null} className={`${props.className || ""}`}>
      {props.children}
    </Box>
  );
};

export default MuiBox;
