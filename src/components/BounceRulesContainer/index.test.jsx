import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import BounceRuleContainer from ".";
import Pagination from "../Pagination";
import { Selectors } from "./selectors";

const { csvButton, createRuleButton, ruleFilter, ruleTable } = Selectors;

const wrapper = shallow(
  <BounceRuleContainer
    filteredRules={[
      {
        id: 504,
        response_code: "550",
        enhanced_code: "",
        regex: "no MX record for domain",
        priority: 0,
        description:
          "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
        bounce_action: "no_action",
      },
    ]}
    filterOptions={[]}
    pageIndex={1}
  />
);

it("should render correctly", () => {
  const tree = renderer
    .create(
      <BounceRuleContainer
        filteredRules={[]}
        filterOptions={[]}
        pageIndex={2}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render a create a bounce rule", () => {
  expect(wrapper.find(createRuleButton)).toHaveLength(1);
});

it("should render a export to csv button", () => {
  expect(wrapper.find(csvButton)).toHaveLength(1);
});

it("should render a filter component", () => {
  expect(wrapper.find(ruleFilter)).toHaveLength(1);
});

it("should render a rule list component", () => {
  expect(wrapper.find(ruleTable)).toHaveLength(1);
});

it("should render paginiation", () => {
  expect(wrapper.find(Pagination)).toHaveLength(1);
});
