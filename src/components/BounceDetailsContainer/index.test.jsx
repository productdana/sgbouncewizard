import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import BounceRuleDetailed from ".";
import { Selectors } from "./selectors";
import { mockBounceRules } from "../../mocks/index";

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
} = Selectors;

const [sampleRule] = mockBounceRules;

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
      changelog: [sampleRule],
      filteredChangelog: [sampleRule],
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
    expect(
      DetailsPage()
        .find(details)
        .exists()
    ).toBeTruthy();
  });

  it("should render change log table", () => {
    expect(
      DetailsPage()
        .find(changelog)
        .exists()
    ).toBeTruthy();
  });

  it("should show edit button", () => {
    expect(
      DetailsPage()
        .find(editButton)
        .exists()
    ).toBeTruthy();
  });

  it("should show cancel/save button when edit is clicked", () => {
    DetailsPage().setProps({ isEditClicked: true });
    expect(
      DetailsPage()
        .find(cancelButton)
        .exists()
    ).toBeTruthy();
    expect(
      DetailsPage()
        .find(saveButton)
        .exists()
    ).toBeTruthy();
  });

  it("should be editable when edit is clicked", () => {
    DetailsPage().setProps({
      isEditClicked: true,
    });
    expect(
      DetailsPage()
        .find(detailsEditable)
        .exists()
    ).toBeTruthy();
  });

  it("should display cancel confirm modal when cancel is clicked", () => {
    DetailsPage().setProps({
      isCancelConfirmOpen: true,
    });
    expect(
      DetailsPage()
        .find(cancelConfirmationModal)
        .exists()
    ).toBeTruthy();
  });

  it("should display save confirm modal when save is clicked", () => {
    DetailsPage().setProps({
      isConfirmOpen: true,
    });
    expect(
      DetailsPage()
        .find(saveConfirmationModal)
        .exists()
    ).toBeTruthy();
  });

  it("should display change modal when rule is clicked", () => {
    DetailsPage().setProps({
      isChangeModalOpen: true,
    });
    expect(
      DetailsPage()
        .find(changelogModal)
        .exists()
    ).toBeTruthy();
  });
});
