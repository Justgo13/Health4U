import React from "react";
import CommentItem from "./comment-item";

import MuiBox from "../MaterialUI/mui-box";
import MuiDivider from "../MaterialUI/mui-divider";

import { useAuthCookies } from "../../shared/cookies/auth-cookies";

import RoundAddBtn from "../round-add-btn";

const CommentList = () => {
  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();
  return (
    <MuiBox className="container item-desc no-bottom-padding">
      <MuiDivider headerText="Customer Comments" />
      <CommentItem />
      <CommentItem />


      <RoundAddBtn link="/shop/addComment" />
      {userInfo.accountType === "Buyer" && (
        <RoundAddBtn link="/shop/addComment" />
      )}
    </MuiBox>
  );
};

export default CommentList;
