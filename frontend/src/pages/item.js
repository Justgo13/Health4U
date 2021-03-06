import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiCarousel from "../components/MaterialUI/mui-carousel";

import Navbar from "../components/NavBar/navbar";
import PriceForm from "../components/Item/price-form";
import Bookmark from "../components/Item/bookmark";
import ItemLanding from "../components/Item/item-landing";
import TextSection from "../components/text-section";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";
import CommentList from "../components/Item/comment-list";

import { getDate } from "../utils/date";
import { useHttpClient } from "../shared/hooks/http-hook";

import "../styles/item.css";

const Item = () => {
  // url hooks
  const { itemID } = useParams();

  const [loadedItem, setLoadedItem] = useState();
  const [relatedItems, setRelatedItems] = useState([]);

  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getItem = async () => {
      let res = await sendRequest(
        `/api/item/getItem/${itemID}`
      );

      let item = res.item;
      let category = item.category;

      // get all items
      res = await sendRequest("/api/item/getItems");

      // get related items by category and filter out duplicate item
      let allItems = res.items;
      let relatedItems = allItems.filter(
        (i) => i.category === category && i.name !== item.name
      );

      setRelatedItems(relatedItems);
      setLoadedItem(item);
    };

    getItem();
  }, [sendRequest, itemID]);

  const textLines = loadedItem
    ? [
        {
          label: "Description",
          text: loadedItem.description,
        },
        {
          label: "Manufaturer",
          text: "Health4U",
        },
        {
          label: "First Available",
          text: getDate(),
        },
      ]
    : [];

  return (
    <Fragment>
      <Navbar />

      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {isLoading && <LoadingCircle />}

      {!isLoading && loadedItem && (
        <Fragment>
          <Bookmark itemID={loadedItem.id} />

          <MuiBox className="flex-container container">
            <ItemLanding item={loadedItem} />
            <PriceForm item={loadedItem} />
          </MuiBox>

          <TextSection sectionHeader="Product Details" textLines={textLines} />

          <CommentList />

          <MuiBox className="container">
            <MuiDivider headerText="Related Products" />
            <MuiCarousel carouselItems={relatedItems} />
          </MuiBox>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Item;
