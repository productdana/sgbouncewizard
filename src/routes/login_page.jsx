import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Login";

// TODO: follow this pattern for the bounce rule details page and bounce rules listing page
// Eventually, we'll test out these integrated route components once we have some mocking of API calls through mock axios
// or Jest's mocking functionality and continue to follow the pattern of abstracting out the network calls into files like ruleCalls.js
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
  }

  handleInputChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleLoginSubmit() {
    const { username, password } = this.state;

    // Validate inputs and don't even kick off a request if invalid input
    if (!(username || password)) {
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
      />
    );
  }
}
