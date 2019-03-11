import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import BounceRuleDetailed from ".";
import { Selectors } from "./selectors";
import { mockBounceRules, mockChangelog } from "../../mocks/index";

const {
  details,
  detailsEditable,
  changelog,
  editButton,
  cancelButton,
  saveButton,
  cancelConfirmationModal,
  changelogModal,
  pagination,
  confirmModal,
} = Selectors;

const [sampleRule] = mockBounceRules;
const [sampleChangelog] = mockChangelog;

describe("Bounce Rule Detailed", () => {
  let props;
  let mountedDetailsPage;
  const DetailsPage = () => {
    if (!mountedDetailsPage) {
      mountedDetailsPage = shallow(<BounceRuleDetailed {...props} />);
    }
    return mountedDetailsPage;
  };
  beforeEach(() => {
    props = {
      currentRule: sampleRule,
      changelog: [sampleChangelog],
      filteredChangelog: [sampleChangelog],
    };
  });

  it("should render correctly", () => {
    expect(
      renderer.create(
        <Router>
          <BounceRuleDetailed {...props} />
        </Router>
      )
    ).toMatchSnapshot();
  });

  describe("When a user visits the detailed rule page", () => {
    it("should render default state", () => {
      expect(DetailsPage().find(details)).toHaveLength(1);
      expect(DetailsPage().find(changelog)).toHaveLength(1);
      expect(DetailsPage().find(editButton)).toHaveLength(1);
      expect(DetailsPage().find(pagination)).toHaveLength(1);
    });
  });

  describe("When there are no rules", () => {
    beforeEach(() => {
      DetailsPage().setProps({ changelog: [] });
    });

    it("should not render pagination when no rules", () => {
      expect(DetailsPage().find(pagination)).toHaveLength(0);
    });
  });

  describe("When a user is editing a rule", () => {
    it("should show cancel/save button when edit is clicked", () => {
      DetailsPage().setProps({ isEditClicked: true });
      expect(DetailsPage().find(cancelButton)).toHaveLength(1);
      expect(DetailsPage().find(saveButton)).toHaveLength(1);
    });

    it("should be editable when edit is clicked", () => {
      DetailsPage().setProps({ isEditClicked: true });
      expect(DetailsPage().find(detailsEditable)).toHaveLength(1);
    });

    it("should display cancel confirm modal when cancel is clicked", () => {
      DetailsPage().setProps({ isCancelConfirmOpen: true });
      expect(DetailsPage().find(cancelConfirmationModal)).toHaveLength(1);
    });

    it("should display confirmation modal when save is clicked", () => {
      DetailsPage().setProps({ isConfirmOpen: true });
      expect(DetailsPage().find(confirmModal)).toHaveLength(1);
    });
  });

  describe("When a user views a change from the changelog", () => {
    it("should display change modal when rule is clicked", () => {
      DetailsPage().setProps({ isChangeModalOpen: true });
      expect(DetailsPage().find(changelogModal)).toHaveLength(1);
    });
  });
});
