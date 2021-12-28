import React from "react";
import Grid from "@mui/material/Grid";
import {
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

import MuiCard from "./mui-card";
import CustomButton from "../custom-button";

const MuiGrid = ({ listActive, categoryList }) => {
  if (listActive) {
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="grid"
      >
        {categoryList.categories.map((category) => (
          <Grid key={uuidv4()} item xs={12} className="grid-item">
            <CustomButton className="btn category-list-btn white-inverse" variant="outline">
              <List>
                <ListItem>
                  <ListItemText primary={<h2 className="list-item">{category.name}</h2>}/>
                </ListItem>
              </List>
            </CustomButton>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {categoryList.categories.map((category) => (
        <Grid key={uuidv4()} item xs={12} sm={6} md={4}>
          <CustomButton className="no-background btn" variant="outline">
            <MuiCard
              title={category.name}
              image={category.image}
              className="carousel-card"
            />
          </CustomButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default MuiGrid;
