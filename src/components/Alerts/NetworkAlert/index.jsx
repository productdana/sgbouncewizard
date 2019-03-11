import React from "react";
import Alert from "@sendgrid/ui-components/alert";
import "./index.scss";

const NetworkAlert = ({ reloadLink, handleModalClose }) => (
  <div className="network-alert">
    <Alert
      type="danger"
      dismissable={false}
      onClick={handleModalClose}
      id="isInvalidInput"
    >
      A network error is detected. Please
      <a href={reloadLink}> refresh </a>
      or try again later.
    </Alert>
  </div>
);

export default NetworkAlert;
