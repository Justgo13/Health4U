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

import { getDate } from "../utils/date";
import { useHttpClient } from "../shared/hooks/http-hook";

import "../styles/item.css";

// temporary until db is in place
const allItems = [
  {
    id: "1",
    name: "Black mask",
    category: "mask",
    description: "Black facial mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    price: 2.12,
    rating: 2.2,
    orderDate: "",
  },
  {
    id: "2",
    name: "Pink mask",
    category: "mask",
    description: "Pink facial mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    price: 2.65,
    rating: 2.3,
    orderDate: "",
  },
];

const Item = () => {
  // url hooks
  const { itemID } = useParams();

  const item = allItems.find((item) => item.id === itemID);

  const [loadedItem, setLoadedItem] = useState();
  const [relatedItems, setRelatedItems] = useState([]);

  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getItem = async () => {
      let res = await sendRequest(
        `http://localhost:5000/api/item/getItem/${itemID}`
      );

      let item = res.item;
      let category = item.category;

      // get all items
      res = await sendRequest("http://localhost:5000/api/item/getItems");

      // get related items by category and filter out duplicate item
      let allItems = res.items;
      let relatedItems = allItems.filter(i => i.category === category && i.name !== item.name);

      setRelatedItems(relatedItems)
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
