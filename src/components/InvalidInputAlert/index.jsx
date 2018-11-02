import React from "react";

const InvalidInputAlert = ({ handleAlertClose }) => (
  <div className="alert alert-danger">
    <p>
      <i className="sg-icon sg-icon-warning" />
      Your username and password fields are required and must contain valid
      characters.
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

export default InvalidInputAlert;
