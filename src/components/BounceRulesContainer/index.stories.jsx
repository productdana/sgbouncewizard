import React from "react";
import { storiesOf } from "@storybook/react";
import { RuleListContainer } from "./index";
import CreateRuleModal from "./CreateRuleModal";
import CreateRuleConfirmationModal from "./CreateRuleConfirmationModal";

const emptyRule = {
  id: "",
  response_code: "",
  enhanced_code: "",
  regex: "",
  priority: 0,
  description: "",
  bounce_action: "",
};

const sampleRule1 = {
  id: 505,
  response_code: 551,
  enhanced_code: 284,
  regex: "test value 2",
  priority: 1,
  description: "bWFpbmx5IGxpYmVydHkgZGluZyBTRyB3aWRl",
  bounce_action: "no_action",
};

const sampleRule2 = {
  id: 505,
  response_code: "551",
  enhanced_code: "",
  regex: "test value 2",
  priority: 0,
  description: "bWFpbmx5IGxpYmVydHkgZGluZyBTRyB3aWRl",
  bounce_action: "no_action",
};

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
  .add("Confirmation", () => <CreateRuleConfirmationModal />);
