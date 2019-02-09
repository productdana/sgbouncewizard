import React from "react";
import { storiesOf } from "@storybook/react";
import RuleFilter from "./index";

storiesOf("Rule Filter", module)
  .add("Empty Default", () => <RuleFilter filterOptions={[]} />)
  .add("Some Inputs", () => (
    <RuleFilter searchToken="no bounce" filterOptions={[]} />
  ))
  .add("With Filter Added", () => (
    <RuleFilter
      filterOptions={[
        { searchToken: "no action", searchCategory: "Bounce Action" },
      ]}
    />
  ));
