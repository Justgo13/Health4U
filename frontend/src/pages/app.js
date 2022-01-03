import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import LandingPage from "./landing-page";
import ShopPage from "./shop-page";
import Category from "./category";
import Item from "./item";
import Cart from "./cart";
import Search from "./search";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="shop" element={<Outlet />}>
          <Route path="" element={<ShopPage />} />
          <Route path="category/:categoryID" element={<Category />} />
          <Route path="item/:itemID" element={<Item />} />
          <Route path="search" element={<Search />} />
          <Route path="cart/:buyerID" element={<Cart />} />
        </Route>

        <Route path="auth" element={<LandingPage />}>
          <Route path="buyer/sign-up" element={<LandingPage />} />
          <Route path="buyer/login" element={<LandingPage />} />
          <Route path="seller/sign-up" element={<LandingPage />} />
          <Route path="seller/login" element={<LandingPage />} />
        </Route>

        <Route path="seller/item/:itemID" element={<LandingPage />} />
        <Route path="seller/account/:sellerID" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
