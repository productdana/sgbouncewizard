import React from "react";

const InvalidCredentialsAlert = ({ handleAlertClose }) => (
  <div data-test="invalid-credentials-alert" className="alert alert-danger">
    <p>
      <i className="sg-icon sg-icon-warning" />
      Your username or password does not match any existing user credentials.
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

export default InvalidCredentialsAlert;
