import React from "react";
import { Button } from "@sendgrid/ui-components/button";

const LoginButton = ({ handleLoginSubmit }) => (
  <Button data-test="login-button" onClick={handleLoginSubmit} type="primary">
    Login
  </Button>
);

export default LoginButton;
