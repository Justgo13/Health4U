import React from "react";
import { useParams } from "react-router-dom";

import MuiBox from "../components/MaterialUI/mui-box";

const Category = () => {
  const { categoryName } = useParams();
  return (
    <MuiBox className="header">
      <h3>{categoryName}</h3>
    </MuiBox>
  );
};

export default Category;
