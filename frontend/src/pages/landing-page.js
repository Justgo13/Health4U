import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "../components/font-awesome-icon";
import CustomButton from "../components/custom-button";
import MuiContainer from "../components/MaterialUI/mui-container";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiTypography from "../components/MaterialUI/mui-typography";

const LandingPage = () => {
  return (
    <MuiBox
      style={{
        backgroundImage: `url(https://t3.ftcdn.net/jpg/02/58/32/94/360_F_258329401_MCy6WUBkklTARuBbYRwENqDYE9ssYrZk.jpg)`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <MuiContainer className="full-height-container">
        <MuiBox>
          <FontAwesomeIcon className="fa-heartbeat icon" fontSize="10rem" />
          <MuiTypography baseComponent="p" className="red-text-xl inline-display">
            Health4U
          </MuiTypography>
        </MuiBox>
        <MuiBox>
          <Link to="shop">
            <CustomButton
              variant="outlined"
              className="white-inverse landingPageBtn"
            >
              Shop Now
            </CustomButton>
          </Link>
        </MuiBox>
      </MuiContainer>
    </MuiBox>
  );
};

export default LandingPage;
