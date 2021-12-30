import React, { Fragment, useState } from "react";
import { CardMedia } from "@mui/material";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiForm from "../components/MaterialUI/mui-form";
import FontAwesomeIcon from "../components/font-awesome-icon";
import CustomButton from "../components/custom-button";

import "../styles/item.css";

const item = {
  id: "1",
  name: "Black mask",
  description: "Black facial mask",
  image:
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  price: 2.12,
};

const Item = () => {
  return (
    <Fragment>
      <MuiBox className="small-box right-align">
        <CustomButton variant="text" className="black no-background no-padding">
          <FontAwesomeIcon
            baseClassName="far"
            className="fa-bookmark"
            fontSize="3rem"
          />
          <span className="small-plus">
            <FontAwesomeIcon className="fa-plus" />
          </span>
        </CustomButton>
      </MuiBox>

      <MuiBox className="flex-container container">
        <MuiBox className="flex-child">
          <h3>{item.name} </h3>
          <CardMedia
            className="image"
            component="img"
            image={item.image}
            alt={item.name}
          />

          <MuiBox className="item-desc">
            <MuiDivider
              children={<h2 className="red-header">Product Details</h2>}
            />
            <p>{item.description}</p>
          </MuiBox>
        </MuiBox>
        <MuiBox className="price-box flex-child">
          <MuiForm />
        </MuiBox>
      </MuiBox>
    </Fragment>
  );
};

export default Item;
