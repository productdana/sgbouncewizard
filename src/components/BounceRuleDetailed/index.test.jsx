import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import BounceRuleDetailed from ".";
import { Selectors } from "./selectors";

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

const sampleRule = {
  id: 504,
  response_code: 550,
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description:
    "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
  bounce_action: "no_action",
  user_id: 0,
};

const BounceRuleDetailedObject = (
  <BounceRuleDetailed
    currentRule={sampleRule}
    changelog={[sampleRule]}
    filteredChangelog={[sampleRule]}
    isEditClicked={false}
    isChangeModalOpen={false}
    isCancelConfirmOpen={false}
    isConfirmOpen={false}
    isUpdateError={false}
    pageIndex={1}
    pageInterval={10}
    pagesToDisplay={5}
    isNetworkError={false}
    changelogLimit={10}
    handleChangelogClicked={jest.fn()}
  />
);

describe("Bounce Rule Detailed", () => {
  let pageWrapper;
  beforeEach(() => {
    pageWrapper = shallow(BounceRuleDetailedObject);
  });

  it("should render correctly", () => {
    expect(
      renderer.create(<StaticRouter>{BounceRuleDetailedObject}</StaticRouter>)
    ).toMatchSnapshot();
  });

  it("should render details table", () => {
    expect(pageWrapper.find(details).exists()).toBeTruthy();
  });

  it("should render change log table", () => {
    expect(pageWrapper.find(changelog).exists()).toBeTruthy();
  });

  it("should show cancel/save button when edit is clicked", () => {
    expect(pageWrapper.find(editButton).exists()).toBeTruthy();
    pageWrapper.setProps({
      isEditClicked: true,
    });
    expect(pageWrapper.find(cancelButton).exists()).toBeTruthy();
    expect(pageWrapper.find(saveButton).exists()).toBeTruthy();
  });

  it("should be editable when edit is clicked", () => {
    pageWrapper.setProps({
      isEditClicked: true,
    });
    expect(pageWrapper.find(detailsEditable).exists()).toBeTruthy();
  });

  it("should display cancel confirm modal when cancel is clicked", () => {
    pageWrapper.setProps({
      isCancelConfirmOpen: true,
    });
    expect(pageWrapper.find(cancelConfirmationModal).exists()).toBeTruthy();
  });

  it("should display save confirm modal when save is clicked", () => {
    pageWrapper.setProps({
      isConfirmOpen: true,
    });
    expect(pageWrapper.find(saveConfirmationModal).exists()).toBeTruthy();
  });

  it("should display change modal when rule is clicked", () => {
    pageWrapper.setProps({
      isChangeModalOpen: true,
    });
    pageWrapper.update();
    expect(pageWrapper.find(changelogModal).exists()).toBeTruthy();
  });
});
