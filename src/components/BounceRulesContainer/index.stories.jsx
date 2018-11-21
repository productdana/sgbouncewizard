import React from "react";
import { storiesOf } from "@storybook/react";
import { RuleListContainer } from "./index";

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
  .add("Default", () => <RuleListContainer rules={[sampleRule]} />)
  .add("Multiple Rules", () => (
    <RuleListContainer rules={[sampleRule, sampleRule2, sampleRule]} />
  ))
  .add("No Rules", () => <RuleListContainer rules={[]} />)
  .add("Network Error", () => <RuleListContainer rules={[]} />);
