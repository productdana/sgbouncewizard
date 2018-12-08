import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import BounceRuleDetailed from ".";

const sampleRule = {
  id: 504,
  response_code: "550",
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description:
    "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
  bounce_action: "no_action"
};

storiesOf("Individual Rule Details", module)
  .add("Default", () => (
    // <BrowserRouter>
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
    // </BrowserRouter>
  ))
  .add("Edit Clicked", () => (
    <BrowserRouter>
      <BounceRuleDetailed
        currentRule={sampleRule}
        isEditClicked
        isChangeModalOpen={false}
        isCancelConfirmOpen={false}
        isConfirmOpen={false}
        handleModalClose={() => {}}
        handleButtonClicked={() => {}}
        handleModalConfirm={() => {}}
        onChangeRule={() => {}}
      />
    </BrowserRouter>
  ))
  .add("Change Modal Open", () => (
    <BrowserRouter>
      <BounceRuleDetailed
        currentRule={sampleRule}
        isEditClicked={false}
        isChangeModalOpen
        isCancelConfirmOpen={false}
        isConfirmOpen={false}
        handleModalClose={() => {}}
        handleButtonClicked={() => {}}
        handleModalConfirm={() => {}}
        onChangeRule={() => {}}
      />
    </BrowserRouter>
  ))
  .add("Cancel Modal Open", () => (
    <BrowserRouter>
      <BounceRuleDetailed
        currentRule={sampleRule}
        isEditClicked={false}
        isChangeModalOpen={false}
        isCancelConfirmOpen
        isConfirmOpen={false}
        handleModalClose={() => {}}
        handleButtonClicked={() => {}}
        handleModalConfirm={() => {}}
        onChangeRule={() => {}}
      />
    </BrowserRouter>
  ))
  .add("Confirm Modal Open", () => (
    <BrowserRouter>
      <BounceRuleDetailed
        currentRule={sampleRule}
        isEditClicked={false}
        isChangeModalOpen={false}
        isCancelConfirmOpen={false}
        isConfirmOpen
        handleModalClose={() => {}}
        handleButtonClicked={() => {}}
        handleModalConfirm={() => {}}
        onChangeRule={() => {}}
      />
    </BrowserRouter>
  ));
