import React from 'react';
import {CardMedia} from "@mui/material"

const MuiImage = ({height, image, title}) => {
    return (
        <CardMedia component="img" height={height || "80%"} image={image} alt={title} />
    );
}

export default MuiImage;
