import React from 'react';
import Box from "@mui/material/Box"

import "../../styles/box.css"

const MuiBox = props => {
    return (
        <Box id={props.id} className={`box ${props.className}`}>
            {props.children}
        </Box>
    );
}

export default MuiBox;
