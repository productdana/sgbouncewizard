import React from "react";
import { Link } from "react-router-dom";
import { Row } from "../Row";
import { Column } from "../Column";
import "./index.scss";

const PageNotFound = () => (
  <div className="not-found-container">
    <Row className="logo-container sg-center">
      <Column width={2} offset={6}>
        <img
          data-test="err-logo"
          className="err-logo sg-center"
          src="https://sendgrid.com/brand/sg-logo-white.png"
          alt="sg-logo"
        />
      </Column>
      <Row data-test="err-msg">
        <Column width={4} offset={5}>
          <h1>404: Page Not Found</h1>
        </Column>
        <div className="space-1" />
        <Column width={4} offset={5}>
          <p className="not-found-subtext sg-center">
            {"Looks like you've fallen off the grid."}
          </p>
        </Column>
        <Column width={4} offset={5}>
          <span
            data-test="err-btn"
            className="btn btn-secondary btn-on-dark sg-centers"
          >
            <Link to="/bounce_rules"> {"Go To Home Page"}</Link>
          </span>
        </Column>
      </Row>
    </Row>
  </div>
);

export default PageNotFound;
