import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import BounceRulesActivity from "./index";

const log1 = {
  bounce_action: "log1",
  comment: "",
  created_at: 1550348178,
  description: "testDescription",
  enhanced_code: "492",
  id: 670,
  operation: "Delete",
  priority: 1,
  regex: "testRegex",
  response_code: 528,
  user_id: 2,
};

const log2 = {
  bounce_action: "log2",
  comment: "",
  created_at: 1550453178,
  description: "testDescription",
  enhanced_code: "492",
  id: 671,
  operation: "Create",
  priority: 1,
  regex: "testRegex",
  response_code: 528,
  user_id: 2,
};

const log3 = {
  bounce_action: "log3",
  comment: "",
  created_at: 1550453278,
  description: "testDescription",
  enhanced_code: "492",
  id: 672,
  operation: "Update",
  priority: 1,
  regex: "testRegex",
  response_code: 528,
  user_id: 2,
};

storiesOf("Bounce Activity Page", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <BounceRulesActivity
      activityLog={[log1, log2, log3]}
      filteredActivityLog={[log1, log2, log3]}
      filterOptions={[]}
      isActivityLogTab
    />
  ))
  .add("Empty", () => (
    <BounceRulesActivity
      activityLog={[]}
      filteredActivityLog={[]}
      filterOptions={[]}
      isActivityLogTab
    />
  ))
  .add("View Details", () => (
    <BounceRulesActivity
      activityLog={[log1, log2, log3]}
      filteredActivityLog={[log1, log2, log3]}
      filterOptions={[]}
      isActivityLogTab
      isActivityModalOpen
      selectedActivity={log1}
    />
  ));
