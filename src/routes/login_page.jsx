import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Login";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticating: false,
      isAuthenticated: false,
      isAuthenticationError: false,
      isInvalidCredentials: false,
      isInvalidInput: false,
      isNetworkError: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  handleInputChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleLoginSubmit(event) {
    const { username, password } = this.state;
    event.preventDefault();
    if (!(username && password)) {
      this.setState({
        isAuthenticationError: true,
        isInvalidInput: true,
        isInvalidCredentials: false,
        isNetworkError: false,
      });

      return;
    }

    this.setState({
      isAuthenticating: false,
      isAuthenticated: false,
      isAuthenticationError: false,
      isInvalidCredentials: false,
      isInvalidInput: false,
      isNetworkError: false,
    });

    // TODO: Make asynchronous request here and update state accordingly
    // If there is a network error in the .catch of a network request then you would set isNetworkError: true
    if (username === "ziv" && password === "papa") {
      this.setState({
        isAuthenticating: false,
        isAuthenticated: true,
        isAuthenticationError: false,
      });
    } else {
      this.setState({
        isAuthenticating: false,
        isAuthenticated: false,
        isAuthenticationError: true,
        isInvalidCredentials: true,
        isNetworkError: false,
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
        username={username}
        password={password}
        isAuthenticating={isAuthenticating}
        isAuthenticationError={isAuthenticationError}
        isInvalidCredentials={isInvalidCredentials}
        isInvalidInput={isInvalidInput}
        isNetworkError={isNetworkError}
        handleInputChange={this.handleInputChange}
        handleLoginSubmit={this.handleLoginSubmit}
        handleAlertClose={this.handleAlertClose}
      />
    );
  }
}
