import React from "react";
import { useParams } from "react-router-dom";

import BuyerProfile from "./buyer-profile";
import SellerProfile from "./seller-profile";

const Profile = () => {
  const { userID } = useParams();
  const users = [
    {
      id: "1",
      name: "Jim Grey",
      email: "jim.grey23@hotmail.com",
      accountType: "Buyer",
      bookmarks: [
        {
          id: "1",
          name: "Black mask",
          category: "mask",
          description: "Black facial mask",
          image:
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
          price: 2.12,
          rating: 2.2,
        },
      ],
    },

    {
      id: "2",
      name: "Jim Grey",
      email: "jim.grey23@hotmail.com",
      accountType: "Seller",
      items: [
        {
          id: "1",
          name: "Black mask",
          category: "mask",
          description: "Black facial mask",
          image:
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
          price: 2.12,
          rating: 2.2,
        },
      ],
    },
  ];

  const user = users.find((u) => u.id === userID);

  if (user.accountType === "Buyer") {
    return <BuyerProfile user={user} />;
  } else if (user.accountType === "Seller") {
    return <SellerProfile user={user} items={user.items}/>;
  }
  return <h1>Invalid ShopPage</h1>;
};

export default Profile;
