import React from "react";
import { Navbar } from "react-bootstrap";

import FontAwesomeIcon from "../font-awesome-icon";
import MuiTypography from "../MaterialUI/mui-typography";

import "../../styles/navbar.css";

const NavbarBrand = () => {
  return (
    <Navbar.Brand href="/shop">
      <FontAwesomeIcon className="fa-heartbeat icon" fontSize="2rem" />
      <MuiTypography variant="h4">Health4U</MuiTypography>
    </Navbar.Brand>
  );
};

export default NavbarBrand;
