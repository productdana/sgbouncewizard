import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import BounceRulesContainer from "./index";
import RuleListContainer from "./RuleListContainer";
import CreateRuleModal, {
  CreateConfirmationModal,
} from "./Modals/CreateRuleModal";
import DeleteRuleModal, {
  DeleteConfirmationAlert,
} from "./Modals/DeleteRuleModal";
import { mockBounceRules } from "../../mocks/index";

const [emptyRule, sampleRule1, sampleRule2] = mockBounceRules;
console.log(emptyRule, sampleRule1, sampleRule2);

storiesOf("Bounce Rule Page", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <BounceRulesContainer
      rules={[sampleRule1, sampleRule2]}
      filteredRules={[sampleRule1, sampleRule2]}
      filterOptions={[]}
      isBounceRulesTab
    />
  ))
  .add("Empty Rules", () => (
    <BounceRulesContainer filteredRules={[]} filterOptions={[]} />
  ))
  .add("Create Rule", () => (
    <BounceRulesContainer
      filteredRules={[sampleRule1, sampleRule2]}
      filterOptions={[]}
      isCreateRuleOpen
    />
  ))
  .add("Create Rule Confirmation", () => (
    <BounceRulesContainer
      filteredRules={[sampleRule1, sampleRule2]}
      filterOptions={[]}
      isCreateRuleConfirmationOpen
    />
  ))
  .add("Delete Rule Confirmation", () => (
    <BounceRulesContainer
      selectedRule={sampleRule1}
      idToDelete={1}
      isCommitValid
    />
  ))
  .add("Delete Rule Error", () => (
    <BounceRulesContainer
      filteredRules={[sampleRule1, sampleRule2]}
      filterOptions={[]}
      isDeleteAlertOpen
    />
  ));

storiesOf("Bounce Rule Table", module)
  .add("Default", () => <RuleListContainer rules={[sampleRule1]} />)
  .add("Multiple Rules", () => (
    <RuleListContainer rules={[sampleRule1, sampleRule2, sampleRule1]} />
  ))
  .add("No Rules", () => <RuleListContainer rules={[]} />)
  .add("Network Error", () => <RuleListContainer rules={[]} />);

storiesOf("Create Rule Modal", module)
  .add("Default", () => <CreateRuleModal newRule={emptyRule} />)
  .add("Filled", () => <CreateRuleModal newRule={sampleRule1} />)
  .add("Invalid Input", () => (
    <CreateRuleModal newRule={emptyRule} isInvalidInput />
  ))
  .add("Confirmation", () => <CreateConfirmationModal />);

storiesOf("Delete Rule Confirmation", module)
  .add("Default", () => <DeleteRuleModal />)
  .add("Alert", () => <DeleteConfirmationAlert />);
