import React from 'react';
import MuiBox from '../MaterialUI/mui-box';
import MuiTypography from '../MaterialUI/mui-typography';
import MuiImage from '../MaterialUI/mui-image';

import {displayStars} from "../../utils/itemRating"

const ItemLanding = ({item}) => {
    return (
        <MuiBox className="flex-child">
          <MuiTypography className="divider-header">{item.name}</MuiTypography>

          {displayStars(item.rating)}

          <MuiImage className="image" image={item.image} alt={item.name} />
        </MuiBox>
    );
}

export default ItemLanding;
