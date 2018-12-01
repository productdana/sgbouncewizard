import React from "react";
import { shallow } from "enzyme";
import EnzymeToJson from "enzyme-to-json";
import BounceRuleDetailed from ".";

const sampleRule = {
  id: 504,
  response_code: "550",
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description:
    "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
  bounce_action: "no_action",
};

const DetailedObj = (
  <BounceRuleDetailed
    currentRule={sampleRule}
    isEditClicked={false}
    isChangeModalOpen={false}
    isCancelConfirmOpen={false}
    isConfirmOpen={false}
    handleModalClose={() => {}}
    handleButtonClicked={() => {}}
    handleModalConfirm={() => {}}
    onChangeRule={() => {}}
  />
);

describe("Bounce Rule Detailed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(DetailedObj);
  });

  it("should render correctly", () => {
    expect(EnzymeToJson(DetailedObj)).toMatchSnapshot();
  });

  it("should render details table", () => {
    expect(wrapper.find('[data-test="detailed-container"]')).toHaveLength(1);
  });

  it("should render change log table", () => {
    expect(wrapper.find('[data-test="changelog-container"]')).toHaveLength(1);
  });

  it("should show cancel/save button when edit is clicked", () => {
    expect(wrapper.find('[data-test="edit-button"]')).toHaveLength(1);
    wrapper.setProps({
      isEditClicked: true,
    });
    expect(wrapper.find('[data-test="cancel-button"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="save-button"]')).toHaveLength(1);
  });

  it("should be editable when edit is clicked", () => {
    wrapper.setProps({
      isEditClicked: true,
    });
    expect(
      wrapper.find('[data-test="detailed-container-editable"]')
    ).toHaveLength(1);
  });

  it("should display cancel confirm modal when cancel is clicked", () => {
    wrapper.setProps({
      isCancelConfirmOpen: true,
    });
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1);
  });

  it("should display save confirm modal when save is clicked", () => {
    wrapper.setProps({
      isConfirmOpen: true,
    });
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1);
  });

  it("should display change modal when rule is clicked", () => {
    wrapper.setProps({
      isChangeModalOpen: true,
    });
    wrapper.update();
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1);
  });
});
