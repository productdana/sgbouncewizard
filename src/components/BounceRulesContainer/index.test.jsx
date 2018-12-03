import React from "react";
import { shallow } from "enzyme";
<<<<<<< HEAD
import BounceRuleContainer from ".";
=======
import EnzymeToJson from "enzyme-to-json";
import BounceRuleContainer, { RuleListContainer } from ".";
import RuleFilter from "../RuleFilter";
>>>>>>> create rule backbone
import Pagination from "../Pagination";
import { Selectors } from "./selectors";

const { csvButton, createRuleButton, ruleFilter, ruleTable } = Selectors;

const testRules = [
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
];

const wrapper = shallow(
  <BounceRuleContainer
<<<<<<< HEAD
    filteredRules={testRules}
=======
    filteredRules={[
      {
        id: 504,
        response_code: "550",
        enhanced_code: "",
        regex: "no MX record for domain",
        priority: 0,
        description:
          "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
        bounce_action: "no_action"
      }
    ]}
>>>>>>> create rule backbone
    filterOptions={[]}
    pageIndex={1}
    numRules={1}
    pageInterval={0}
  />
);

it("should render correctly", () => {
<<<<<<< HEAD
  const tree = renderer
    .create(
      <BounceRuleContainer
        rules={testRules}
        filteredRules={testRules}
        filterOptions={[]}
        pageIndex={2}
      />
    )
    .toJSON();
=======
  const tree = EnzymeToJson(wrapper);
>>>>>>> create rule backbone
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
