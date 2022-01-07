import React from "react";
import { useParams } from "react-router-dom";

import BuyerProfile from "./buyer-profile";
import SellerProfile from "./seller-profile";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Profile = () => {
  const { userID } = useParams();
  const { getUserInfo } = useAuthCookies();

  const user = getUserInfo();

  if (user.accountType === "Buyer") {
    return <BuyerProfile user={user} />;
  } else if (user.accountType === "Seller") {
    return <SellerProfile user={user} items={user.items} />;
  }
  return <h1>Invalid ShopPage</h1>;
};

export default Profile;
