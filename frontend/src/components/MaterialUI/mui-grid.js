import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import MuiCard from "./mui-card";
import CustomButton from "../custom-button";
import MuiToggleButton from "./mui-toggle-button";
import MuiBox from "./mui-box";
import MuiTypography from "./mui-typography";
import FontAwesomeIcon from "../font-awesome-icon";
import MuiSelect from "./Form/mui-select";

import { useCartCookies } from "../../shared/cookies/cart-cookies";
import { useAuthCookies } from "../../shared/cookies/auth-cookies";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MuiGrid = ({ baseLink, link, gridItems, cart, seller, onDelete }) => {
  const [isModuleCategories, setIsModuleCategories] = useState(true);

  let quantity = [];

  for (let i = 1; i < 50; i++) {
    quantity.push(i);
  }

  const { setItemQuantity, deleteCartItem } = useCartCookies();

  const deleteItemHandler = (id) => deleteCartItem(id);

  const { sendRequest } = useHttpClient();

  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const deleteItemHandlerDB = async (sellerID, itemID) => {
    await sendRequest("http://localhost:5000/api/item/deleteItem", "DELETE", {
      sellerID,
      itemID,
    });
    onDelete(itemID)
  };

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
              <Link to={`/${baseLink}/${link}/${gridItem.id}`}>
                <CustomButton className="no-btn-padding" variant="outline">
                  <MuiCard
                    title={gridItem.name}
                    image={gridItem.image}
                    className="card"
                  />
                </CustomButton>
              </Link>
              {cart && (
                <MuiBox className="container center">
                  <MuiBox className="flex-child">
                    <CustomButton
                      className="big-btn white-inverse"
                      onClick={() => deleteItemHandler(gridItem.id)}
                    >
                      <FontAwesomeIcon className="fa-trash big-icon" />
                    </CustomButton>
                  </MuiBox>
                  <MuiBox className="flex-child">
                    <MuiSelect
                      classname="top-bottom-margin full-width"
                      labelText="Quantity"
                      selectItems={quantity}
                      defaultValue={gridItem.quantity}
                      onChange={setItemQuantity}
                      onChangeParams={gridItem.id}
                    />
                  </MuiBox>
                </MuiBox>
              )}

              {seller && (
                <CustomButton
                  className="big-btn white-inverse"
                  onClick={() => deleteItemHandlerDB(userInfo.id, gridItem.id)}
                >
                  <FontAwesomeIcon className="fa-trash big-icon" />
                </CustomButton>
              )}
            </Grid>
          ))}

        {!isModuleCategories &&
          gridItems.map((gridItem) => (
            <Grid key={gridItem.id} item xs={12}>
              <Link to={`/${baseLink}/${link}/${gridItem.id}`}>
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
              {cart && (
                <MuiBox className="container center">
                  <MuiBox className="flex-child">
                    <CustomButton
                      className="big-btn white-inverse"
                      onClick={() => deleteItemHandler(gridItem.id)}
                    >
                      <FontAwesomeIcon className="fa-trash big-icon" />
                    </CustomButton>
                  </MuiBox>
                  <MuiBox className="flex-child">
                    <MuiSelect
                      classname="top-bottom-margin full-width"
                      labelText="Quantity"
                      selectItems={quantity}
                      defaultValue={gridItem.quantity}
                      onChange={setItemQuantity}
                      onChangeParams={gridItem.id}
                    />
                  </MuiBox>
                </MuiBox>
              )}
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default MuiGrid;
