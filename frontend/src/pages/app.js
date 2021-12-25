import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./landing-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="shop" element={<LandingPage />}>
          <Route path="category/:categoryName" element={<LandingPage />} />
          <Route path="item/:itemID" element={<LandingPage />} />
          <Route path="search/:searchQuery" element={<LandingPage />} />
          <Route path="cart/:buyerID" element={<LandingPage />} />
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
