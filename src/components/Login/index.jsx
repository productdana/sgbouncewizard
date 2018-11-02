import React from "react";
// import { Row } from "@sendgrid/ui-components/grid/row";
// import { Column } from "@sendgrid/ui-components/grid/column";
import { TextInput } from "@sendgrid/ui-components/text-input";
import PropTypes from "prop-types";
import { Row } from "../Row";
import { Column } from "../Column";
import "./index.scss";
import InvalidCredentialsAlert from "../InvalidCredentialsAlert";
import NetworkErrorAlert from "../NetworkErrorAlert";
import InvalidInputAlert from "../InvalidInputAlert";
import LoadingButton from "../LoadingButton";
import LoginButton from "../LoginButton";

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
  handleAlertClose,
}) => (
  <div className="login-container">
    <Row>
      <Column width={10} offset={2}>
        <div className="login-form-container">
          <div className="login-logo">
            <img
              src="https://uiux.s3.amazonaws.com/toggleable-logos/header-logo.svg"
              alt="sg-logo"
            />
          </div>
          <Row width={8} offset={2}>
            {!isAuthenticating &&
              isAuthenticationError &&
              isInvalidCredentials && (
                <InvalidCredentialsAlert
                  data-test="invalid-credentials-alert"
                  handleAlertClose={handleAlertClose}
                />
              )}
            {!isAuthenticating &&
              isAuthenticationError &&
              isNetworkError && (
                <NetworkErrorAlert
                  data-test="network-error-alert"
                  handleAlertClose={handleAlertClose}
                />
              )}
            {!isAuthenticating &&
              isAuthenticationError &&
              isInvalidInput && (
                <InvalidInputAlert
                  data-test="invalid-input-alert"
                  handleAlertClose={handleAlertClose}
                />
              )}
          </Row>
          <div className="login-form-body">
            <Row>
              <Column width={6} offset={4}>
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
              <Column width={6} offset={4}>
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
              <Column width={6} offset={4}>
                <div className="login-button-container">
                  {!isAuthenticating && (
                    <LoginButton
                      data-test="login-button"
                      handleLoginSubmit={handleLoginSubmit}
                    />
                  )}
                  {isAuthenticating && (
                    <LoadingButton
                      data-test="login-loading-button"
                      handleLoginSubmit={handleLoginSubmit}
                    />
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
