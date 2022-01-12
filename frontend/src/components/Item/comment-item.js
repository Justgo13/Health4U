import React from "react";

import MuiBox from "../MaterialUI/mui-box";
import MuiTypography from "../MaterialUI/mui-typography";

import { displayStars } from "../../utils/itemRating";

const CommentItem = () => {
  return (
    <MuiBox className="top-bottom-margin">
      <MuiBox className="no-bottom-padding left-align-box comment-heading">
        <MuiTypography baseComponent="h3" variant="p">
          {displayStars(0)} <strong>Very Cheap, Good price</strong>
        </MuiTypography>
      </MuiBox>

      <MuiBox className="no-bottom-padding left-align-box comment-content">
        <MuiTypography baseComponent="h5" variant="p">
          Jason says <em>This product is tight and works well with glasses</em>
        </MuiTypography>
      </MuiBox>
    </MuiBox>
  );
};

export default CommentItem;
