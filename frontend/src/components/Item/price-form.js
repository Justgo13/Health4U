import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MuiForm from "../MaterialUI/mui-form";
import MuiTypography from "../MaterialUI/mui-typography";
import MuiBox from "../MaterialUI/mui-box";
import MuiSelect from "../MaterialUI/Form/mui-select";
import CustomButton from "../custom-button";
import FontAwesomeIcon from "../font-awesome-icon";
import CartPreviewModal from "../Modal/CartPreview/cart-preview-modal";

import { useCustomCookies, CART_ITEMS } from "../../shared/cookies/cookies";
import { useModalReducer } from "../Modal/modal-reducer";

const PriceForm = ({ item }) => {
  let quantity = [];

  for (let i = 1; i < 50; i++) {
    quantity.push(i);
  }

  const [priceDollar, setPriceDollar] = useState(0);
  const [priceCents, setPriceCents] = useState(0);
  useEffect(() => {
    const dollarPrice = Math.trunc(item.price);
    const centsPrice = Math.round((item.price - dollarPrice) * 100);
    setPriceDollar(dollarPrice);
    setPriceCents(centsPrice);
  }, [setPriceDollar, setPriceCents]);

  const { onCartItemsCookieChange, getCartItems } = useCustomCookies();

  const [itemQuantity, setItemQuantity] = useState(1);
  const addProductToCartHandler = (e) => {
    e.preventDefault();
    onCartItemsCookieChange({
      id: item.id,
      name: item.name,
      quantity: itemQuantity,
      image: item.image,
      price: item.price,
    });
    showCartModal();
  };

  const [modalState, showCartModal, hideCartModal] = useModalReducer({
    isCartModalShown: false,
  });

  const navigate = useNavigate();
  const checkoutHandler = (e) => {
    e.preventDefault();
    navigate("/shop/cart/1");
  };

  return (
    <MuiForm
      formHeader={
        <MuiTypography className="divider-header">
          ${priceDollar}
          <span className="decimal-cost align-top">{priceCents}</span>
        </MuiTypography>
      }
      submitHandler={addProductToCartHandler}
    >
      <MuiBox className="grey-background top-bottom-padding">
        <MuiBox>
          <MuiSelect
            classname="top-bottom-margin"
            labelText="Quantity"
            selectItems={quantity}
            defaultValue={itemQuantity}
            onChange={setItemQuantity}
          />
        </MuiBox>

        <CustomButton className="white-inverse big-btn" type="submit">
          Add to cart
        </CustomButton>

        <MuiTypography variant="p" baseComponent="p">
          <FontAwesomeIcon className="fa-shipping-fast small-icon" /> Sold and
          Shipped by Jason
        </MuiTypography>
        <MuiTypography variant="p" baseComponent="p">
          <FontAwesomeIcon className="fa-calendar-times small-icon" /> Estimated
          shipping time 1 to 3 days
        </MuiTypography>
      </MuiBox>

      {modalState.isCartModalShown && (
        <CartPreviewModal
          isModalShown={modalState.isCartModalShown}
          onClose={hideCartModal}
          cartList={getCartItems()}
          buttonHandler={checkoutHandler}
        />
      )}
    </MuiForm>
  );
};

export default PriceForm;
