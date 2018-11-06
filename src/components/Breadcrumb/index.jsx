import React from "react";
import SGBreadcrumb from "@sendgrid/ui-components/breadcrumb";
import "./index.scss";

const Breadcrumb = () => (
  <div className="breadcrumb-container">
    <SGBreadcrumb>
      <a href="#">Bounce Rules</a>
    </SGBreadcrumb>
  </div>
);

export default Breadcrumb;
