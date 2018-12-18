import React from "react";
import { Redirect } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Login, { LoginForm } from ".";
import { Selectors } from "./selectors";

describe("Login", () => {
  const {
    emailInput,
    passwordInput,
    loginButton,
    loginLoadingButton,
    invalidCredentialsAlert,
    invalidInputAlert,
    networkErrorAlert,
  } = Selectors;

  it("should render correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("When the user first sees the Login Form", () => {
    it("should render the default state", () => {
      const loginFormWrapper = mount(<LoginForm />);

      expect(loginFormWrapper.find(emailInput).exists()).toBeTruthy();
      expect(loginFormWrapper.find(passwordInput).exists()).toBeTruthy();
      expect(loginFormWrapper.find(loginButton).exists()).toBeTruthy();
    });

    describe("When the user is logging in", () => {
      it("should display the loading the button", () => {
        const loginFormWrapper = mount(
          <LoginForm username="ziv" password="password" isAuthenticating />
        );

        expect(loginFormWrapper.find(loginButton).exists()).toBeFalsy();
        expect(loginFormWrapper.find(loginLoadingButton).exists()).toBeTruthy();
      });
    });
  });

  describe("When the user provides invalid credentials", () => {
    it("should display the invalid credentials alert", () => {
      const wrapper = mount(
        <Login
          username="ziv"
          password="invalidcredentials"
          isAuthenticating={false}
          isAuthenticationError
          isInvalidCredentials
        />
      );

      expect(wrapper.find(invalidCredentialsAlert).exists()).toBeTruthy();
    });
  });

  describe("When the user provides invalid input", () => {
    it("should display the invalid input alert", () => {
      const wrapper = mount(
        <Login
          username=""
          password=""
          isAuthenticating={false}
          isAuthenticationError
          isInvalidInput
        />
      );

      expect(wrapper.find(invalidInputAlert).exists()).toBeTruthy();
    });
  });

  describe("When the user receives a network error", () => {
    it("should display the network error alert", () => {
      const wrapper = mount(
        <Login
          username="ziv"
          password="papa"
          isAuthenticating={false}
          isAuthenticationError
          isNetworkError
        />
      );

      expect(wrapper.find(Redirect).exists()).toBeFalsy();
      expect(wrapper.find(networkErrorAlert).exists()).toBeTruthy();
    });
  });
});
