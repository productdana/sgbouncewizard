import React from "react";
import { storiesOf } from "@storybook/react";
import Login from "./index";

storiesOf("Login", module)
  .add("Empty Default", () => <Login />)
  .add("Some Inputs", () => (
    <Login username="testusername" password="testpassword" />
  ))
  .add("Invalid Credentials", () => (
    <Login
      username="wrong"
      password="password"
      isAuthenticating={false}
      isAuthenticationError
      isInvalidCredentials
    />
  ))
  .add("Network Error", () => (
    <Login
      username="ziv"
      password="papa"
      isAuthenticating={false}
      isAuthenticationError
      isNetworkError
    />
  ))
  .add("Invalid Input", () => (
    <Login
      username=""
      password=""
      isAuthenticating={false}
      isAuthenticationError
      isInvalidInput
    />
  ))
  .add("Loggin In (Loading)", () => (
    <Login username="ziv" password="papa" isAuthenticating />
  ));
