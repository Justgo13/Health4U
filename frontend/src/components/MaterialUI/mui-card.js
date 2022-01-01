import React from "react";

import { Card, CardActions, CardContent } from "@mui/material";

import MuiTypography from "./mui-typography";

import MuiImage from "./mui-image";

import "../../styles/mui.css";

const MuiCard = ({ title, description, image, className }) => {
  return (
    <Card className={`card ${className || ""}`}>
      <MuiImage image={image} alt={title} />
      <CardContent>
        <MuiTypography variant="h4">
          {title}
        </MuiTypography>
        <MuiTypography variant="body2">{description}</MuiTypography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default MuiCard;
