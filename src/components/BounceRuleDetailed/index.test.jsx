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

const props = {
  currentRule: sampleRule,
  changelog: [sampleRule],
  filteredChangelog: [sampleRule],
  isEditClicked: false,
  isChangeModalOpen: false,
  isCancelConfirmOpen: false,
  isConfirmOpen: false,
  isUpdateError: false,
  pageIndex: 1,
  pageInterval: 10,
  pagesToDisplay: 5,
  isNetworkError: false,
  changelogLimit: 10,
  handleModalClose: jest.fn(),
  handleButtonClicked: jest.fn(),
  onChangeRule: jest.fn(),
  handleEditClicked: jest.fn(),
  handleCancelSaveClicked: jest.fn(),
  handleChangelogClicked: jest.fn(),
  handleCancelConfirmation: jest.fn(),
  handleSaveConfirmation: jest.fn(),
  onChangeRuleInt: jest.fn(),
  updatePageIndex: jest.fn(),
};

const BounceRuleDetailedObject = <BounceRuleDetailed {...props} />;

describe("Bounce Rule Detailed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(BounceRuleDetailedObject);
  });

  it("should render correctly", () => {
    expect(
      renderer.create(<StaticRouter>{BounceRuleDetailedObject}</StaticRouter>)
    ).toMatchSnapshot();
  });

  it("should render details table", () => {
    console.log(wrapper.debug());
    expect(wrapper.find(details).exists()).toBeTruthy();
  });

  it("should render change log table", () => {
    expect(wrapper.find(changelog).exists()).toBeTruthy();
  });

  it("should show cancel/save button when edit is clicked", () => {
    expect(wrapper.find(editButton).exists()).toBeTruthy();
    wrapper.setProps({
      isEditClicked: true,
    });
    expect(wrapper.find(cancelButton).exists()).toBeTruthy();
    expect(wrapper.find(saveButton).exists()).toBeTruthy();
  });

  it("should be editable when edit is clicked", () => {
    wrapper.setProps({
      isEditClicked: true,
    });
    expect(wrapper.find(detailsEditable).exists()).toBeTruthy();
  });

  it("should display cancel confirm modal when cancel is clicked", () => {
    wrapper.setProps({
      isCancelConfirmOpen: true,
    });
    expect(wrapper.find(cancelConfirmationModal).exists()).toBeTruthy();
  });

  it("should display save confirm modal when save is clicked", () => {
    wrapper.setProps({
      isConfirmOpen: true,
    });
    expect(wrapper.find(saveConfirmationModal).exists()).toBeTruthy();
  });

  it("should display change modal when rule is clicked", () => {
    wrapper.setProps({
      isChangeModalOpen: true,
    });
    wrapper.update();
    expect(wrapper.find(changelogModal).exists()).toBeTruthy();
  });
});
