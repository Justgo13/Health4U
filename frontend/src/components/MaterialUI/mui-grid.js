import React from "react";
import Grid from "@mui/material/Grid";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import MuiCard from "./mui-card";
import CustomButton from "../custom-button";

const MuiGrid = ({ moduleGrid, listGrid, gridItems }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      className="grid"
      rowSpacing={1}
    >
      {moduleGrid &&
        gridItems.map((category) => (
          <Grid
            key={category.id}
            item
            xs={12}
            sm={6}
            md={4}
            className="grid-item"
          >
            <Link to={`category/${category.name}`}>
              <CustomButton className="no-background btn" variant="outline">
                <MuiCard
                  title={category.name}
                  image={category.image}
                  className="carousel-card"
                />
              </CustomButton>
            </Link>
          </Grid>
        ))}

      {listGrid &&
        gridItems.map((category) => (
          <Grid key={category.id} item xs={12} className="grid-item">
            <Link to={`category/${category.name}`}>
              <CustomButton
                className="btn category-list-btn white-inverse"
                variant="outline"
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={<h2 className="list-item">{category.name}</h2>}
                    />
                  </ListItem>
                </List>
              </CustomButton>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default MuiGrid;
