import React, { Fragment } from "react";

import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import {
  VALIDATE_REQUIRE,
  VALIDATE_EMAIL,
} from "../components/MaterialUI/Form/mui-textfield";

import Navbar from "../components/NavBar/navbar";
import EditForm from "../components/MaterialUI/Form/edit-form";

import { useAuthCookies } from "../shared/cookies/auth-cookies";

const Profile = () => {
  const { getUserInfo } = useAuthCookies();
  const user = getUserInfo();

  const initFormState = [
    {
      name: "name",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE],
    },
    {
      name: "email",
      value: "",
      isValid: false,
      validators: [VALIDATE_REQUIRE, VALIDATE_EMAIL],
    },
  ];

  return (
    <Fragment>
      <Navbar />

      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText={`${user.name}'s Profile`} />

        <EditForm
          initFormState={initFormState}
          formHeader="Profile Details"
          profile
          defaultValue={user}
        />
      </MuiBox>
    </Fragment>
  );
};

export default Profile;
