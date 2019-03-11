import React from "react";
import { storiesOf } from "@storybook/react";
import ConfirmationModal from ".";
import { WriteSelectors } from "../../BounceRulesContainer/selectors";
import { mockBounceRules } from "../../../mocks";

const [sampleRule] = mockBounceRules;

storiesOf("Confirmation Modals", module)
  .add("Default Confirmation Modal", () => (
    <ConfirmationModal selectors={WriteSelectors} isCommitValid />
  ))
  .add("Valid Input", () => (
    <ConfirmationModal
      selectedRule={sampleRule}
      selectors={WriteSelectors}
      isCommitValid
    />
  ))
  .add("Invalid Input", () => (
    <ConfirmationModal selectors={WriteSelectors} isCommitValid={false} />
  ));
