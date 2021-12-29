import React from "react";
import { Navbar } from "react-bootstrap";

import FontAwesomeIcon from "../font-awesome-icon";

import "../../styles/navbar.css"

const NavbarBrand = () => {
  return (
    <Navbar.Brand href="/shop/mainPage">
      <FontAwesomeIcon className="fa-heartbeat icon" fontSize="2rem"/>
      <h1>Health4U</h1>
    </Navbar.Brand>
  );
};

export default NavbarBrand;
