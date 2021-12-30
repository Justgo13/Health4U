import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "../components/font-awesome-icon";
import CustomButton from "../components/custom-button";
import MuiContainer from "../components/MaterialUI/mui-container";
import MuiBox from "../components/MaterialUI/mui-box";

import "../styles/landingPage.css";

const LandingPage = () => {
  const enterShopHandler = () => {};

  return (
    <MuiBox id="landingPage" className="fullscreen">
      <MuiContainer className="landingPageContainer">
        <div className="row">
          <h1 className="heading">
            <FontAwesomeIcon className="fa-heartbeat icon" fontSize="10rem" />
            <p>Health4U</p>
          </h1>
        </div>
        <div className="row">
          <Link to="shop">
            <CustomButton
              variant="outlined"
              className="white-inverse landingPageBtn"
              onClick={enterShopHandler}
            >
              Shop Now
            </CustomButton>
          </Link>
        </div>
      </MuiContainer>
    </MuiBox>
  );
};

export default LandingPage;
