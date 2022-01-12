import React from "react";
import MuiBox from "./MaterialUI/mui-box";
import {Link} from "react-router-dom";
import CustomButton from "./custom-button";
import FontAwesomeIcon from "./font-awesome-icon";

const RoundAddBtn = ({link}) => {
  return (
    <MuiBox className="center top-bottom-margin">
      <Link to={link}>
        <CustomButton className="green-inverse lg-round">
          <FontAwesomeIcon className="fa-plus" />
        </CustomButton>
      </Link>
    </MuiBox>
  );
};

export default RoundAddBtn;
