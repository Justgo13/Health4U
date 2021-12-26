import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "../components/font-awesome-icon";
import CustomButton from "../components/custom-button";

import "../styles/landingPage.css";

const LandingPage = () => {
  const enterShopHandler = () => {};

  return (
    <div id="landingPage" className="fullscreen">
      <Container className="container">
        <div className="row">
          <h1 className="heading">
            <FontAwesomeIcon
              className="fa-heartbeat icon"
              fontSize="10rem"
            />
            <p>Health4U</p>
          </h1>
        </div>
        <div className="row">
          <Link to="shop" className="link">
            <CustomButton
              variant="outlined"
              className="white-inverse btn"
              onClick={enterShopHandler}
            >
              Shop Now
            </CustomButton>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
