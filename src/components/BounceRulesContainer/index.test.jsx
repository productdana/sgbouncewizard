import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import BounceRuleContainer from ".";
import Pagination from "../shared/Pagination";
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

const testActivity = [
  {
    id: 173,
    response_code: 421,
    enhanced_code: "",
    regex: "",
    priority: 0,
    description: "RFC5321Servicenotavailable",
    bounce_action: "retry",
    user_id: 1,
    created_at: 1,
    comment: "Inital Setup",
    operation: "New",
  },
];

const defaultProps = {
  rules: testRules,
  filteredRules: testRules,
  filterOptions: [],
  pageIndex: 1,
  pagesToDisplay: 5,
  activityLog: testActivity,
  filteredActivityLog: testActivity,
  isFetching: false,
  isBounceRulesTab: true,
};

const wrapper = shallow(<BounceRuleContainer {...defaultProps} />);

it("should render correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <BounceRuleContainer {...defaultProps} />
      </Router>
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
