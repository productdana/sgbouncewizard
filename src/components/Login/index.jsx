import React from "react";
import { Row } from "@sendgrid/ui-components/grid/row";
import { Column } from "@sendgrid/ui-components/grid/column";
import { Button } from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Alert } from "@sendgrid/ui-components/alert";
import PropTypes from "prop-types";
import "./index.scss";

const Login = ({
  username,
  password,
  isAuthenticating,
  isAuthenticationError,
  isInvalidCredentials,
  isInvalidInput,
  isNetworkError,
  handleLoginSubmit,
  handleInputChange,
}) => (
  <div className="login-container">
    <Row>
      <Column width={1} />
      <Column width={10}>
        <div className="login-form-container">
          <div className="login-logo">
            <img
              src="https://uiux.s3.amazonaws.com/toggleable-logos/header-logo.svg"
              alt="sg-logo"
            />
          </div>
          <Row width={2} />
          <Row width={8}>
            {!isAuthenticating &&
              isAuthenticationError &&
              isInvalidCredentials &&
              {
                /* TODO: <InvalidCredentialsAlert /> */
              }(
                <Alert
                  data-test="invalid-credentials-alert"
                  type="danger"
                  dismissable
                >
                  Your username or password does not match any existing user
                  credentials.
                </Alert>
              )}
            {!isAuthenticating &&
              isAuthenticationError &&
              isNetworkError &&
              {
                /* TODO: <NetworkErrorAlert /> */
              }(
                <Alert
                  data-test="network-error-alert"
                  type="danger"
                  dismissable
                >
                  We are unable to authenticate your user due to some issues
                  with the network.
                </Alert>
              )}
            {!isAuthenticating &&
              isAuthenticationError &&
              isInvalidInput &&
              {
                /* TODO: Break each of these alerts out into stateless functional components so you can eventually call it like <InvalidInputAlert /> */
              }(
                <Alert
                  data-test="network-error-alert"
                  type="danger"
                  dismissable
                >
                  Your username and password fields are required and must
                  contain valid characters.
                </Alert>
              )}
          </Row>
          <div className="login-form-body">
            <Row>
              <Column width={2} />
              <Column width={8} offset={2}>
                <div className="input-text-wrap">
                  <TextInput
                    data-test="username-field"
                    onChange={e => handleInputChange(e, "username")}
                    value={username}
                    type="text"
                    label="Username"
                  />
                </div>
              </Column>
            </Row>
            <Row>
              <Column width={2} />
              <Column width={8}>
                <TextInput
                  onChange={e => handleInputChange(e, "password")}
                  data-test="password-field"
                  value={password}
                  type="password"
                  label="Password"
                />
              </Column>
            </Row>
            <Row>
              <Column width={4} />
              <Column width={4}>
                <div className="login-button-container">
                  {!isAuthenticating && (
                    <Button
                      data-test="login-button"
                      onClick={handleLoginSubmit}
                      type="primary"
                    >
                      Login
                    </Button>
                  )}
                  {isAuthenticating && (
                    <Button
                      data-test="login-loading-button"
                      onClick={handleLoginSubmit}
                      type="primary"
                      loading
                    >
                      Logging in...
                    </Button>
                  )}
                </div>
              </Column>
            </Row>
          </div>
        </div>
      </Column>
    </Row>
  </div>
);

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  isAuthenticating: PropTypes.bool,
  isAuthenticationError: PropTypes.bool,
  isInvalidCredentials: PropTypes.bool,
  isInvalidInput: PropTypes.bool,
  isNetworkError: PropTypes.bool,
  handleLoginSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};

Login.defaultProps = {
  username: "",
  password: "",
  isAuthenticating: false,
  isAuthenticationError: false,
  isInvalidCredentials: false,
  isInvalidInput: false,
  isNetworkError: false,
  handleLoginSubmit: () => {},
  handleInputChange: () => {},
};

export default Login;
