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
import Profile from "./profile";
import Bookmarks from "./bookmarks";
import OrderHistory from "./order-history";
import SellerItems from "./seller-items";
import SellerAddItem from "./seller-add-item";
import SellerEditItem from "./seller-edit-item";
import AddComment from "./add-comment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="shop" element={<Outlet />}>
          <Route path="" element={<ShopPage />} />
          <Route path="category/:categoryName" element={<Category />} />
          <Route path="item/:itemID" element={<Item />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="addComment" element={<AddComment />} />
        </Route>

        <Route path="auth" element={<Outlet />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="buyer" element={<Outlet />}>
          <Route path="profile/:userID" element={<Profile />} />
          <Route path="order-history/:userID" element={<OrderHistory />} />
          <Route path="bookmarks/:userID" element={<Bookmarks />} />
        </Route>

        <Route path="seller" element={<Outlet />}>
          <Route path="profile/:userID" element={<Profile />} />
          <Route path="items/:userID" element={<SellerItems />} />
          <Route path="item/addItem" element={<SellerAddItem />} />
          <Route path="item/editItem/:itemID" element={<SellerEditItem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
