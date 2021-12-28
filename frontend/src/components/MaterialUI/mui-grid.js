import React from "react";
import Grid from "@mui/material/Grid";
import MuiCard from "./mui-card";

const MuiGrid = ({ categoryList }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {categoryList.categories.map((category) => (
        <Grid item xs={12} sm={6} md={4}>
          <MuiCard
            title={category.name}
            image={category.image}
            className="carousel-card"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MuiGrid;
