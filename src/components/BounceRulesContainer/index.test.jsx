import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import BounceRuleContainer, { RuleListContainer } from ".";
import RuleFilter from "../RuleFilter";
import Pagination from "../Pagination";

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
        rules={[
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
        pageIndex={2}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render a create a bounce rule", () => {
  expect(wrapper.find('[data-test="create-rule-button"]')).toHaveLength(1);
});

it("should render a export to csv button", () => {
  expect(wrapper.find('[data-test="export-csv-button"]')).toHaveLength(1);
});

it("should render a filter component", () => {
  expect(wrapper.find(RuleFilter)).toHaveLength(1);
});

it("should render a rule list component", () => {
  expect(wrapper.find(RuleListContainer)).toHaveLength(1);
});

it("should render paginiation", () => {
  expect(wrapper.find(Pagination)).toHaveLength(1);
});
