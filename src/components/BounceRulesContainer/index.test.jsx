import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import BounceRuleContainer from ".";

import { Selectors } from "./selectors";
import { mockBounceRules } from "../../mocks/index";

describe("Bounce Rules Page", () => {
  let props;
  let mountedBounceRulesPage;
  const {
    csvButton,
    createRuleButton,
    ruleFilter,
    ruleTable,
    emptyRulesWarning,
    createRuleModal,
    confirmModal,
    pagination,
  } = Selectors;

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

  describe("When a user visits the bounce rule page", () => {
    it("should render default state", () => {
      expect(BounceRulesPage().find(".page-tab")).toHaveLength(1);
      expect(BounceRulesPage().find(createRuleButton)).toHaveLength(1);
      expect(BounceRulesPage().find(csvButton)).toHaveLength(1);
      expect(BounceRulesPage().find(ruleFilter)).toHaveLength(1);
      expect(BounceRulesPage().find(ruleTable)).toHaveLength(1);
      expect(BounceRulesPage().find(pagination)).toHaveLength(1);
    });
  });

  describe("When there are no rules", () => {
    beforeEach(() => {
      BounceRulesPage().setProps({ filteredRules: [], rules: [] });
    });

    it("should render warning when no rules available", () => {
      expect(BounceRulesPage().find(emptyRulesWarning)).toHaveLength(1);
    });

    it("should not render pagination when no rules", () => {
      expect(BounceRulesPage().find(pagination)).toHaveLength(0);
    });
  });

  describe("When the user clicks on 'Create Rule'", () => {
    it("should render create rule modal", () => {
      BounceRulesPage().setProps({ isCreateRuleOpen: true });
      expect(BounceRulesPage().find(createRuleModal)).toHaveLength(1);
    });

    it("should render create rule confirmation after submitting", () => {
      BounceRulesPage().setProps({ isCreateRuleConfirmationOpen: true });
      expect(BounceRulesPage().find(confirmModal)).toHaveLength(1);
    });
  });

  describe("When the user clicks on a rule to delete", () => {
    it("should render delete rule modal", () => {
      BounceRulesPage().setProps({ isDeleteConfirmationOpen: true });
      expect(BounceRulesPage().find(confirmModal)).toHaveLength(1);
    });
  });
});
