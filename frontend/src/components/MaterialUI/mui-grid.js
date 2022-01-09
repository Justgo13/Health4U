import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";

import MuiToggleButton from "./mui-toggle-button";
import MuiBox from "./mui-box";
import MuiTypography from "./mui-typography";

import GridItemList from "../Grid/grid-item-list";
import GridItemModule from "../Grid/grid-item-module";
import GridItemCart from "../Grid/grid-item-cart";
import GridItemSeller from "../Grid/grid-item-seller";

const MuiGrid = ({ baseLink, link, gridItems, cart, seller, onDelete, noButton }) => {
  const [isModuleCategories, setIsModuleCategories] = useState(true);

  if (gridItems.length === 0) {
    return (
      <MuiTypography variant="h3" className="center">
        No items found
      </MuiTypography>
    );
  }

  return (
    <Fragment>
      <MuiBox className="left-align-box">
        <MuiToggleButton onChange={setIsModuleCategories} />
      </MuiBox>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {isModuleCategories &&
          gridItems.map((gridItem) => (
            <Grid key={uuidv4()} item xs={12} sm={6} md={4}>
              <GridItemModule
                link={`/${baseLink}/${link}/${gridItem.id}`}
                gridItem={gridItem}
                noButton={noButton}
              />
              {cart && <GridItemCart gridItem={gridItem} />}

              {seller && (
                <GridItemSeller
                  gridItem={gridItem}
                  link={`/seller/item/editItem/${gridItem.id}`}
                  onDelete={onDelete}
                />
              )}
            </Grid>
          ))}

        {!isModuleCategories &&
          gridItems.map((gridItem) => (
            <Grid key={gridItem.id} item xs={12}>
              <GridItemList
                link={`/${baseLink}/${link}/${gridItem.id}`}
                gridItem={gridItem}
                noButton
              />
              {cart && <GridItemCart gridItem={gridItem} />}

              {seller && (
                <GridItemSeller
                  gridItem={gridItem}
                  link={`/seller/item/editItem/${gridItem.id}`}
                  onDelete={onDelete}
                />
              )}
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default MuiGrid;
