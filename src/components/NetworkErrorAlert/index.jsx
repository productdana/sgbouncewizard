import React from "react";

const NetworkErrorAlert = ({ handleAlertClose }) => (
  <div className="alert alert-danger">
    <p>
      <i className="sg-icon sg-icon-warning" />
      We are unable to authenticate your user due to some issues with the
      network.{" "}
      <i
        onClick={handleAlertClose}
        onKeyDown={handleAlertClose}
        className="sg-icon sg-icon-x"
        role="button"
        tabIndex={0}
      />
    </p>
  </div>
);

export default NetworkErrorAlert;
