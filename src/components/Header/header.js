import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="light">
      <Link to="/">
        <Navbar.Brand>
          <img
            src={Logo}
            width="25%"
            height="30"
            className="d-inline-block align-top"
            alt="Pokehouse logo"
          />
        </Navbar.Brand>
      </Link>
    </Navbar>
  );
}
