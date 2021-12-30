import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

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
        {carouselItems.map((item) => {
          return (
            <MuiContainer key={item.id} id="featuredContainer">
              <Link className="featured-link" to={`/shop/item/${item.id}`}>
                <CustomButton
                  className="no-background carousel-card-btn no-btn-padding"
                  variant="outline"
                >
                  <MuiCard
                    title={item.name}
                    image={item.image}
                    className="card"
                  />
                </CustomButton>
              </Link>
            </MuiContainer>
          );
        })}
      </Carousel>
    </MuiContainer>
  );
};

export default MuiCarousel;
