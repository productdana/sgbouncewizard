import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import BounceRulesContainer from "./index";
import RuleListContainer from "./RuleListContainer";
import CreateRuleModal from "./Modals/CreateRuleModal";
import { mockBounceRules } from "../../mocks/index";

const [emptyRule, sampleRule1, sampleRule2] = mockBounceRules;

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
      selectedRule={sampleRule1}
      filterOptions={[]}
      isCreateRuleConfirmationOpen
    />
  ))
  .add("Delete Rule Confirmation", () => (
    <BounceRulesContainer
      filteredRules={[sampleRule1, sampleRule2]}
      selectedRule={sampleRule1}
      filterOptions={[]}
      idToDelete={1}
      isCommitValid
      isDeleteConfirmationOpen
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
  ));

storiesOf("Create Rule Modal", module)
  .add("Default", () => <CreateRuleModal newRule={emptyRule} />)
  .add("Filled", () => <CreateRuleModal newRule={sampleRule1} />)
  .add("Invalid Input", () => (
    <CreateRuleModal newRule={emptyRule} isInvalidInput />
  ));
