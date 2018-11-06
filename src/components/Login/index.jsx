import React from "react";
import { TextInput } from "@sendgrid/ui-components/text-input";
import PropTypes from "prop-types";
import { Button } from "@sendgrid/ui-components/button";
import { Row } from "../Row";
import { Column } from "../Column";
import "./index.scss";

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

const LoadingButton = () => (
  <Button
    data-test="login-loading-button"
    form="login-form"
    type="primary"
    loading
    isSubmit
  >
    Logging in...
  </Button>
);

const LoginButton = () => (
  <Button data-test="login-button" form="login-form" type="primary" isSubmit>
    Login
  </Button>
);

const LoginForm = ({
  handleLoginSubmit,
  handleInputChange,
  username,
  password,
  isAuthenticating,
}) => (
  <div className="login-form-body">
    <form onSubmit={handleLoginSubmit} id="login-form">
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
            {!isAuthenticating && <LoginButton data-test="login-button" />}
            {isAuthenticating && (
              <LoadingButton data-test="login-loading-button" />
            )}
          </div>
        </Column>
      </Row>
    </form>
  </div>
);

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
          <LoginForm
            username={username}
            password={password}
            handleInputChange={handleInputChange}
            handleLoginSubmit={handleLoginSubmit}
            isAuthenticating={isAuthenticating}
          />
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
export { LoginForm };
