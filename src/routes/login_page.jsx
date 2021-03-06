import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Login";
import authenticateUser from "../utils/authenticate";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isAuthenticating: false,
      isAuthenticated: false,
      isAuthenticationError: false,
      isInvalidCredentials: false,
      isInvalidInput: false,
      isNetworkError: false,
    };

    this.updateField = this.updateField.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  updateField(e, field) {
    this.setState({
      [field]: e.currentTarget.value,
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;

    if (!(email && password)) {
      this.setState({
        isAuthenticationError: true,
        isInvalidInput: true,
        isInvalidCredentials: false,
        isNetworkError: false,
      });
      return;
    }

    this.setState({
      isAuthenticating: true,
    });

    try {
      const { data, status } = await authenticateUser({ email, password });
      if (status === 200 && data.id !== 0 && data.id !== undefined) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.first_name);
        localStorage.setItem("isAuth", true);
        this.setState(() => ({
          isAuthenticating: false,
          isAuthenticated: true,
          isInvalidCredentials: false,
          isInvalidInput: false,
          isAuthenticationError: false,
          isNetworkError: false,
        }));
      } else {
        this.setState(() => ({
          isAuthenticating: false,
          isAuthenticated: false,
          isInvalidCredentials: true,
          isInvalidInput: false,
          isAuthenticationError: true,
          isNetworkError: false,
        }));
      }
    } catch (err) {
      this.setState({
        isAuthenticating: false,
        isAuthenticated: false,
        isInvalidCredentials: false,
        isInvalidInput: false,
        isAuthenticationError: false,
        isNetworkError: true,
      });
    }
  }

  handleAlertClose() {
    this.setState({
      isAuthenticating: false,
      isAuthenticated: false,
      isAuthenticationError: false,
      isInvalidCredentials: false,
      isInvalidInput: false,
      isNetworkError: false,
    });
  }

  render() {
    const {
      username,
      email,
      password,
      isAuthenticating,
      isAuthenticated,
      isAuthenticationError,
      isInvalidCredentials,
      isInvalidInput,
      isNetworkError,
    } = this.state;
    const redirectLink = "/bounce_rules";

    return isAuthenticated ? (
      <Redirect to={redirectLink} />
    ) : (
      <Login
        email={email}
        username={username}
        password={password}
        isAuthenticating={isAuthenticating}
        isAuthenticationError={isAuthenticationError}
        isInvalidCredentials={isInvalidCredentials}
        isInvalidInput={isInvalidInput}
        isNetworkError={isNetworkError}
        handleLogin={this.handleLogin}
        handleAlertClose={this.handleAlertClose}
        updateField={this.updateField}
      />
    );
  }
}
