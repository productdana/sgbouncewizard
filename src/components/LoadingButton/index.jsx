import React from "react";
import { Button } from "@sendgrid/ui-components/button";

const LoadingButton = ({ handleLoginSubmit }) => (
  <Button
    data-test="login-loading-button"
    onClick={handleLoginSubmit}
    type="primary"
    loading
  >
    Logging in...
  </Button>
);

export default LoadingButton;
