import React from "react";
import { Redirect } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Login from ".";

describe("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  // TODO: fix tests now that we're mostly just varying up the props and seeing what renders
  it("should render correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render username input", () => {
    expect(wrapper.find('[data-test="username-field"]')).toHaveLength(1);
  });

  it("should render password input", () => {
    expect(wrapper.find('[data-test="password-field"]')).toHaveLength(1);
  });

  it("should change the state of username", () => {
    wrapper
      .find('[data-test="username-field"]')
      .simulate("change", { target: { value: "papa" } }, "userName");
    wrapper.update();
    expect(wrapper.state("userName")).toEqual("papa");
  });

  it("should change the state of password", () => {
    wrapper
      .find('[data-test="password-field"]')
      .simulate("change", { target: { value: "ziv" } }, "password");
    wrapper.update();
    expect(wrapper.state("password")).toEqual("ziv");
  });

  it("should call handleLogin() when submitting", () => {
    expect(
      wrapper.find('[data-test="login-button"]').get(0).props.onClick
    ).toBe(wrapper.instance().handleLogin);
  });

  it("should display error when credentails are invalid", () => {
    wrapper
      .find('[data-test="username-field"]')
      .simulate("change", { target: { value: "wrong" } }, "userName");
    wrapper
      .find('[data-test="password-field"]')
      .simulate("change", { target: { value: "pass" } }, "password");
    wrapper.update();
    wrapper.find('[data-test="login-button"]').simulate("click");
    wrapper.update();
    expect(
      wrapper.exists('[data-test="invalid-credentials-alert"]')
    ).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it("should redirect when login succeeds", () => {
    wrapper
      .find('[data-test="username-field"]')
      .simulate("change", { target: { value: "ziv" } }, "userName");
    wrapper
      .find('[data-test="password-field"]')
      .simulate("change", { target: { value: "papa" } }, "password");
    wrapper.update();
    wrapper.find('[data-test="login-button"]').simulate("click");
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
