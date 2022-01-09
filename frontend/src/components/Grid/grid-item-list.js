import React from "react";
import { Link } from "react-router-dom";

import { List, ListItem, ListItemText } from "@mui/material";

import CustomButton from "../custom-button";
import MuiTypography from "../MaterialUI/mui-typography";

const GridItemList = ({ link, gridItem, noButton }) => {
  if (noButton) {
    return (
      <CustomButton
        className="max-width default-border white-inverse"
        variant="outline"
        disabled
      >
        <List>
          <ListItem>
            <ListItemText
              primary={
                <MuiTypography variant="h4" className="list-item">
                  {gridItem.name}
                </MuiTypography>
              }
            />
          </ListItem>
        </List>
      </CustomButton>
    );
  }

  return (
    <Link to={link}>
      <CustomButton
        className="max-width default-border white-inverse"
        variant="outline"
      >
        <List>
          <ListItem>
            <ListItemText
              primary={
                <MuiTypography variant="h4" className="list-item">
                  {gridItem.name}
                </MuiTypography>
              }
            />
          </ListItem>
        </List>
      </CustomButton>
    </Link>
  );
};

export default GridItemList;
