import React, { Fragment, useState } from "react";
import { CardMedia } from "@mui/material";

import MuiBox from "../components/MaterialUI/mui-box";
import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiCarousel from "../components/MaterialUI/mui-carousel";

import FontAwesomeIcon from "../components/font-awesome-icon";
import CustomButton from "../components/custom-button";

import { useCartContext } from "../shared/context/consumer/cart-consumer";
import { useQuantityContext } from "../shared/context/consumer/quantity-consumer";

import "../styles/item.css";

const item = {
  id: "1",
  name: "Black mask",
  category: "mask",
  description: "Black facial mask",
  image:
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  price: 2.12,
  rating: 2.2,
};

const allItems = [
  {
    id: "1",
    name: "Random Item #1",
    category: "mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  },
  {
    id: "2",
    name: "Random Item #2",
    category: "mask",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  },
  {
    id: "3",
    name: "Random Item #3",
    category: "kit",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  },
  {
    id: "4",
    name: "Random Item #4",
    category: "kit",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  },
];

const relatedItems = allItems.filter((i) => i.category === item.category);

const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

// had to hardcoded ratings, could not find a way to dynamically generate them
const displayStars = (itemRating) => {
  itemRating = roundHalf(itemRating); // rounds ratings such as 2.2 to 2.0
  switch (itemRating) {
    case 0.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 1:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 1.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 2.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 2.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 3.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 3.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 4.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 4.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
        </Fragment>
      );
    case 5.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
  }
};

const Item = () => {
  const [bookMarkClicked, setBookMarkClicked] = useState(false);

  const cartContext = useCartContext();
  const quantityContext = useQuantityContext();

  const bookmarkHandler = (e) => {
    setBookMarkClicked(!bookMarkClicked);
  };

  const addToCartHandler = (e) => {
    cartContext.onAddToCart(item.name, quantityContext.quantity);
  };

  return (
    <Fragment>
      <MuiBox className="small-box right-align">
        <CustomButton
          variant="text"
          className="black no-background no-padding"
          onClick={bookmarkHandler}
        >
          {!bookMarkClicked && (
            <FontAwesomeIcon
              baseClassName="far"
              className="fa-bookmark"
              fontSize="3rem"
            />
          )}

          {bookMarkClicked && (
            <FontAwesomeIcon className="fa-bookmark" fontSize="3rem" />
          )}
          <span className="small-plus">
            <FontAwesomeIcon className="fa-plus" />
          </span>
        </CustomButton>
      </MuiBox>

      <MuiBox className="flex-container container">
        <MuiBox className="flex-child">
          <h3>{item.name} </h3>

          <p>{displayStars(item.rating)}</p>

          <CardMedia
            className="image"
            component="img"
            image={item.image}
            alt={item.name}
          />
        </MuiBox>

        <MuiBox className="price-box flex-child">
          <MuiForm
            submitHandler={addToCartHandler}
            formHeader={["$2", <span className="decimal-cost">99</span>]}
          />
        </MuiBox>
      </MuiBox>

      <MuiBox className="container item-desc no-bottom-padding">
        <MuiDivider
          children={<h2 className="red-header">Product Details</h2>}
        />
        <MuiBox className="no-bottom-padding">
          <p>Description - {item.description}</p>
          <p>Manufacturer - Health4U</p>
          <p>First available - December 30, 2021</p>
        </MuiBox>
      </MuiBox>

      <MuiBox className="container">
        <MuiDivider
          children={<h2 className="red-header">Related Products</h2>}
        />
        <MuiCarousel carouselItems={relatedItems} />
      </MuiBox>
    </Fragment>
  );
};

export default Item;
