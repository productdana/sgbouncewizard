import React from "react";
import { Row } from "../Row";
import { Column } from "../Column";
import "./index.scss";

const Header = ({ name }) => (
  <div className="header-container">
    <Row>
      <Column width={3} offset={2}>
        <img
          className="sg-logo"
          data-test="sg-logo"
          alt="sendgrid-logo"
          style={{ maxWidth: "150px" }}
          src="https://uiux.s3.amazonaws.com/toggleable-logos/header-logo.svg"
        />
      </Column>
      <Column width={2} offset={10}>
        <div className="header-user-container">
          <span data-test="user-greeting" className="header-greeting">
            Hello, {name || "User"}!
          </span>
          <a data-test="logout-button" className="header-logout" href="/">
            Logout
          </a>
        </div>
      </Column>
    </Row>
  </div>
);

export default Header;
