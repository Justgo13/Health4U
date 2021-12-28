import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "../../styles/mui.css";


const MuiCard = ({title, description, image, className}) => {
  return (
    <Card className={`${className}`}>
      <CardMedia
        component="img"
        height="80%"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          <h2>{title}</h2>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
};

export default MuiCard;
