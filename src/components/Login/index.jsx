import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Button } from "@sendgrid/ui-components/button";
import { Row } from "../shared/Row";
import { Column } from "../shared/Column";
import "./index.scss";
import { WriteSelectors } from "./selectors";

const InvalidCredentialsAlert = ({ handleAlertClose }) => (
  <div
    {...WriteSelectors.invalidCredentialsAlert}
    className="alert alert-danger"
  >
    <p>
      <i className="sg-icon sg-icon-warning" />
      Your email or password does not match any existing user credentials.
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
  <div {...WriteSelectors.invalidInputAlert} className="alert alert-danger">
    <p>
      <i className="sg-icon sg-icon-warning" />
      Your email and password fields are required and must contain valid
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
  <div {...WriteSelectors.networkErrorAlert} className="alert alert-danger">
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
    {...WriteSelectors.loginLoadingButton}
    form="login-form"
    type="primary"
    loading
    isSubmit
  >
    Logging in...
  </Button>
);

const LoginButton = () => (
  <Button
    {...WriteSelectors.loginButton}
    form="login-form"
    type="primary"
    isSubmit
  >
    Login
  </Button>
);

const LoginForm = ({
  handleLogin,
  email,
  password,
  isAuthenticating,
  updateField,
}) => (
  <div {...WriteSelectors.loginContainer} className="login-form-body">
    <form onSubmit={handleLogin} id="login-form">
      <Row>
        <Column width={6} offset={4}>
          <div className="input-text-wrap">
            <TextInput
              {...WriteSelectors.emailInput}
              onChange={e => updateField(e, "email")}
              value={email}
              type="email"
              label="Email"
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column width={6} offset={4}>
          <TextInput
            {...WriteSelectors.passwordInput}
            onChange={e => updateField(e, "password")}
            value={password}
            type="password"
            label="Password"
          />
        </Column>
      </Row>
      <Row>
        <Column width={6} offset={4}>
          <div className="login-button-container">
            {!isAuthenticating && <LoginButton />}
            {isAuthenticating && <LoadingButton />}
          </div>
        </Column>
      </Row>
    </form>
  </div>
);

const Login = ({
  email,
  password,
  isAuthenticating,
  isAuthenticationError,
  isInvalidCredentials,
  isInvalidInput,
  isNetworkError,
  handleLogin,
  handleAlertClose,
  updateField,
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
                <InvalidCredentialsAlert handleAlertClose={handleAlertClose} />
              )}
            {!isAuthenticating && isAuthenticationError && isNetworkError && (
              <NetworkErrorAlert handleAlertClose={handleAlertClose} />
            )}
            {!isAuthenticating && isAuthenticationError && isInvalidInput && (
              <InvalidInputAlert handleAlertClose={handleAlertClose} />
            )}
          </Row>
          <LoginForm
            email={email}
            password={password}
            handleLogin={handleLogin}
            isAuthenticating={isAuthenticating}
            updateField={updateField}
          />
        </div>
      </Column>
    </Row>
  </div>
);

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  isAuthenticating: PropTypes.bool,
  isAuthenticationError: PropTypes.bool,
  isInvalidCredentials: PropTypes.bool,
  isInvalidInput: PropTypes.bool,
  isNetworkError: PropTypes.bool,
  handleLogin: PropTypes.func,
  updateField: PropTypes.func,
};

Login.defaultProps = {
  email: "",
  password: "",
  isAuthenticating: false,
  isAuthenticationError: false,
  isInvalidCredentials: false,
  isInvalidInput: false,
  isNetworkError: false,
  handleLogin: () => {},
  updateField: () => {},
};

export default Login;
export { LoginForm };
