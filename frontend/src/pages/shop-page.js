import React, { useEffect, useState } from "react";

import MuiCarousel from "../components/MaterialUI/mui-carousel";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiGrid from "../components/MaterialUI/mui-grid";
import MuiBox from "../components/MaterialUI/mui-box";

import Navbar from "../components/NavBar/navbar";
import LoadingCircle from "../components/loading-circle";
import ErrorModal from "../components/Modal/error-modal";

import { useCartCookies } from "../shared/cookies/cart-cookies";
import { useAuthCookies } from "../shared/cookies/auth-cookies";
import { useHttpClient } from "../shared/hooks/http-hook";

const ShopPage = () => {
  useCartCookies();
  useAuthCookies();

  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();
  const [loadedCategories, setLoadedCategories] = useState();

  useEffect(() => {
    const getItems = async () => {
      const res = await sendRequest("/api/item/getItems");

      let allItems = res.items;
      // get categories for each item and add to set
      let categories = [];
      allItems.map((item) => {
        let duplicateFound = false;
        for (const category of categories) {
          if (category.name === item.category) {
            duplicateFound = true;
          }
        }
        if (!duplicateFound) {
          categories.push({ name: item.category, image: item.image });
        }
      });

      setLoadedCategories(categories);
      setLoadedItems(allItems);
    };

    getItems();
  }, [sendRequest]);

  return (
    <MuiBox>
      <Navbar />

      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {isLoading && <LoadingCircle />}
      {!isLoading && loadedItems && (
        <MuiBox className="container">
          <MuiDivider headerText="Hot Items" />
          <MuiCarousel carouselItems={loadedItems} />
          <MuiDivider headerText="Categories" />
          <MuiGrid
            gridItems={loadedCategories}
            link="category"
            baseLink="shop"
            category
          />
        </MuiBox>
      )}
    </MuiBox>
  );
};

export default ShopPage;
