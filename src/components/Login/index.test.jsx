import React from "react";
import { Redirect } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Login, { LoginForm } from ".";

describe("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("should render correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render email input", () => {
    const loginFormWrapper = shallow(<LoginForm />);
    expect(loginFormWrapper.find('[data-test="email-field"]')).toHaveLength(1);
  });

  it("should render password input", () => {
    const loginFormWrapper = shallow(<LoginForm />);
    expect(loginFormWrapper.find('[data-test="password-field"]')).toHaveLength(
      1
    );
  });

  it("should display loading button when user is being authenticated", () => {
    const loginFormWrapper = shallow(<LoginForm />);

    loginFormWrapper.setProps({
      username: "ziv",
      password: "papa",
      isAuthenticating: true,
    });
    expect(
      loginFormWrapper.exists('[data-test="login-loading-button"]')
    ).toBeTruthy();
  });

  it("should display alert when credentials are invalid", () => {
    wrapper.setProps({
      username: "wrong",
      password: "password",
      isAuthenticating: false,
      isAuthenticationError: true,
      isInvalidCredentials: true,
    });
    expect(
      wrapper.exists('[data-test="invalid-credentials-alert"]')
    ).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it("should display alert when there is a network error", () => {
    wrapper.setProps({
      username: "ziv",
      password: "papa",
      isAuthenticating: false,
      isAuthenticationError: true,
      isNetworkError: true,
    });
    expect(wrapper.exists('[data-test="network-error-alert"]')).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it("should display alert when there is invalid input", () => {
    wrapper.setProps({
      username: "",
      password: "",
      isAuthenticating: false,
      isAuthenticationError: true,
      isInvalidInput: true,
    });
    expect(wrapper.exists('[data-test="invalid-input-alert"]')).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });
});
