import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button";
import MuiCard from "../MaterialUI/mui-card";

const GridItemModule = ({ link, gridItem }) => {
  return (
    <Link to={link}>
      <CustomButton className="no-btn-padding" variant="outline">
        <MuiCard
          title={gridItem.name}
          image={gridItem.image}
          className="card"
        />
      </CustomButton>
    </Link>
  );
};

export default GridItemModule;
