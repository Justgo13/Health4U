import React from 'react';
import {CardMedia} from "@mui/material"

const MuiImage = ({className, height, image, title}) => {
    return (
        <CardMedia className={className || "" } component="img" height={height || "80%"} image={image} alt={title} />
    );
}

export default MuiImage;
