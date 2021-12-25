import React from 'react';
import Icon from "@mui/material/Icon";

import "../styles/icon.css"

const FontAwesomeIcon = ({baseClassName, className, fontSize}) => {
    return (
        <Icon baseClassName={`${baseClassName || "fas"}`} className={className} sx={{ fontSize: fontSize }}></Icon>
    );
}

export default FontAwesomeIcon;
