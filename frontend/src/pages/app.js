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
import SignUp from "./sign-up";
import Login from "./login";

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

        <Route path="auth" element={<Outlet />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="seller/item/:itemID" element={<LandingPage />} />
        <Route path="seller/account/:sellerID" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
