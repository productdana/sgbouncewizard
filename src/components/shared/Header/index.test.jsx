import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Header from ".";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});

it("should render correctly", () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render SG Logo", () => {
  expect(wrapper.find("[data-test='sg-logo']")).toHaveLength(1);
});

it("should render user greeting", () => {
  expect(wrapper.find("[data-test='user-greeting']")).toHaveLength(1);
});

it("should render logout button", () => {
  expect(wrapper.find("[data-test='logout-button']")).toHaveLength(1);
});
