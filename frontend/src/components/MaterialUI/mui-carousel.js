import React from "react";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-material-ui-carousel";

import FontAwesomeIcon from "../font-awesome-icon";
import MuiContainer from "./mui-container";
import MuiCard from "./mui-card";
import CustomButton from "../custom-button";

import "../../styles/mui.css";

const MuiCarousel = ({ carouselItems }) => {
  return (
    <MuiContainer>
      <Carousel
        className="carousel"
        animation="slide"
        navButtonsAlwaysVisible
        activeIndicatorIconButtonProps
        navButtonsProps={{
          // Change the background and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            background: "none",
            borderRadius: 0,
          },
        }}
        NextIcon={
          <FontAwesomeIcon className="fa-caret-square-right caret fa-lg" />
        }
        PrevIcon={
          <FontAwesomeIcon className="fa-caret-square-left caret fa-lg" />
        }
      >
        {carouselItems.map((item, i) => {
          return (
            <MuiContainer key={uuidv4()} id="featuredContainer">
              <CustomButton className="no-background carousel-card-btn" variant="outline">
                <MuiCard
                  title={item.name}
                  description={item.description}
                  image={item.image}
                  className="carousel-card"
                />
              </CustomButton>
            </MuiContainer>
          );
        })}
      </Carousel>
    </MuiContainer>
  );
};

export default MuiCarousel;
