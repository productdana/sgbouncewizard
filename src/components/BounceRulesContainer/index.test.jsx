import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import BounceRuleContainer from ".";
import Pagination from "../Pagination";
import { Selectors } from "./selectors";

const {
  csvButton,
  createRuleButton,
  ruleFilter,
  ruleTable,
  emptyRulesWarning,
  createRuleModal,
  confirmModal,
} = Selectors;

const testRules = [
  {
    id: 504,
    response_code: 550,
    enhanced_code: "",
    regex: "no MX record for domain",
    priority: 0,
    description:
      "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
    bounce_action: "no_action",
  },
];

const newRule = {
  id: 504,
  response_code: 551,
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description: "new rule",
  bounce_action: "no_action",
};

const wrapper = shallow(
  <BounceRuleContainer
    rules={testRules}
    filteredRules={testRules}
    filterOptions={[]}
    pageIndex={1}
    numRules={1}
    pageInterval={0}
    pagesToDisplay={5}
  />
);

it("should render correctly", () => {
  const tree = renderer
    .create(
      <BounceRuleContainer
        rules={testRules}
        filteredRules={testRules}
        filterOptions={[]}
        pageIndex={2}
        pagesToDisplay={5}
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

it("should render warning when no rules available", () => {
  wrapper.setProps({ filteredRules: [], rules: [] });
  expect(wrapper.find(emptyRulesWarning)).toHaveLength(1);
});

it("should render create rule modal", () => {
  wrapper.setProps({ isCreateRuleOpen: true });
  expect(wrapper.find(createRuleModal)).toHaveLength(1);
});

it("should render create rule confirmation", () => {
  wrapper.setProps({ isCreateRuleConfirmationOpen: true });
  expect(wrapper.find(confirmModal).exists()).toBeTruthy();
});

it("should call listRules() on render", () => {
  wrapper.setProps({
    newRule,
    isCreateRuleConfirmationOpen: true,
  });
  expect(wrapper.find(confirmModal).exists()).toBeTruthy();
});
