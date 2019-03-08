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
  saveConfirmationModal,
  changelogModal,
  pagination,
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

  it("should render details table", () => {
    expect(DetailsPage().find(details)).toHaveLength(1);
  });

  it("should render change log table", () => {
    expect(DetailsPage().find(changelog)).toHaveLength(1);
  });

  it("should show edit button", () => {
    expect(DetailsPage().find(editButton)).toHaveLength(1);
  });

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

  it("should display save confirm modal when save is clicked", () => {
    DetailsPage().setProps({ isConfirmOpen: true });
    expect(DetailsPage().find(saveConfirmationModal)).toHaveLength(1);
  });

  it("should display change modal when rule is clicked", () => {
    DetailsPage().setProps({ isChangeModalOpen: true });
    expect(DetailsPage().find(changelogModal)).toHaveLength(1);
  });

  it("should render paginiation", () => {
    expect(DetailsPage().find(pagination)).toHaveLength(1);
  });

  it("should not render paginiation when no rules", () => {
    DetailsPage().setProps({ changelog: [] });
    expect(DetailsPage().find(pagination)).toHaveLength(0);
  });
});
