import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import PageNotFound from ".";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<PageNotFound />);
});

it("should render correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render SG logo", () => {
  expect(wrapper.find("[data-test='err-logo']")).toHaveLength(1);
});

it("should render 404 message", () => {
  expect(wrapper.find("[data-test='err-msg']")).toHaveLength(1);
});

it("should render home button", () => {
  expect(wrapper.find("[data-test='err-btn']")).toHaveLength(1);
});
