import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "../../styles/mui.css";


const MuiCard = ({title, description, image}) => {
  return (
    <Card className="carousel-card">
      <CardMedia
        component="img"
        height="80%"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {title}
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
