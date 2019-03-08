import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import BounceRuleContainer from ".";
import { Selectors } from "./selectors";
import { mockBounceRules } from "../../mocks/index";

const {
  csvButton,
  createRuleButton,
  ruleFilter,
  ruleTable,
  emptyRulesWarning,
  createRuleModal,
  confirmModal,
  deleteConfirmation,
  pagination,
} = Selectors;

describe("Bounce Rules Page", () => {
  let props;
  let mountedBounceRulesPage;
  const BounceRulesPage = () => {
    if (!mountedBounceRulesPage) {
      mountedBounceRulesPage = shallow(<BounceRuleContainer {...props} />);
    }
    return mountedBounceRulesPage;
  };

  beforeEach(() => {
    props = {
      rules: mockBounceRules,
      filteredRules: mockBounceRules,
      filterOptions: [],
      pageIndex: 1,
      pagesToDisplay: 5,
      isFetching: false,
      isBounceRulesTab: true,
    };
    mountedBounceRulesPage = undefined;
  });

  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <BounceRuleContainer {...props} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render a create a bounce rule", () => {
    expect(
      BounceRulesPage()
        .find(createRuleButton)
        .exists()
    ).toBeTruthy();
  });

  it("should render a export to csv button", () => {
    expect(
      BounceRulesPage()
        .find(csvButton)
        .exists()
    ).toBeTruthy();
  });

  it("should render filter component", () => {
    expect(BounceRulesPage().find(ruleFilter)).toHaveLength(1);
  });

  it("should render rule table component", () => {
    expect(BounceRulesPage().find(ruleTable)).toHaveLength(1);
  });

  it("should render warning when no rules available", () => {
    BounceRulesPage().setProps({ filteredRules: [], rules: [] });
    expect(BounceRulesPage().find(emptyRulesWarning)).toHaveLength(1);
  });

  it("should render paginiation", () => {
    expect(BounceRulesPage().find(pagination)).toHaveLength(1);
  });

  it("should not render paginiation when no rules", () => {
    BounceRulesPage().setProps({ filteredRules: [], rules: [] });
    expect(BounceRulesPage().find(pagination)).toHaveLength(0);
  });

  it("should render create rule modal", () => {
    BounceRulesPage().setProps({ isCreateRuleOpen: true });
    expect(BounceRulesPage().find(createRuleModal)).toHaveLength(1);
  });

  it("should render delete rule modal", () => {
    BounceRulesPage().setProps({ isDeleteConfirmationOpen: true });
    expect(BounceRulesPage().find(deleteConfirmation)).toHaveLength(1);
  });

  it("should render create rule confirmation", () => {
    BounceRulesPage().setProps({ isCreateRuleConfirmationOpen: true });
    expect(BounceRulesPage().find(confirmModal)).toHaveLength(1);
  });
});
