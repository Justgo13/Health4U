import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import MuiCard from "./mui-card";
import CustomButton from "../custom-button";
import MuiToggleButton from "./mui-toggle-button";
import MuiBox from "./mui-box";

const MuiGrid = ({ baseLinkType, linkType, gridItems }) => {
  const [isModuleCategories, setIsModuleCategories] = useState(true);
  return (
    <Fragment>
      <MuiBox className="grid-toggle">
        <MuiToggleButton onChange={setIsModuleCategories} />
      </MuiBox>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="grid"
      >
        {isModuleCategories &&
          gridItems.map((gridItem) => (
            <Grid
              key={gridItem.id}
              item
              xs={12}
              sm={6}
              md={4}
              className="grid-item"
            >
              <Link to={`/${baseLinkType}/${linkType}/${gridItem.id}`}>
                <CustomButton className="no-background no-btn-padding" variant="outline">
                  <MuiCard
                    title={gridItem.name}
                    image={gridItem.image}
                    className="card"
                  />
                </CustomButton>
              </Link>
            </Grid>
          ))}

        {!isModuleCategories &&
          gridItems.map((gridItem) => (
            <Grid key={gridItem.id} item xs={12} className="grid-item">
              <Link to={`/${baseLinkType}/${linkType}/${gridItem.id}`}>
                <CustomButton
                  className="btn grid-list-btn white-inverse"
                  variant="outline"
                >
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={<h2 className="list-item">{gridItem.name}</h2>}
                      />
                    </ListItem>
                  </List>
                </CustomButton>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default MuiGrid;
