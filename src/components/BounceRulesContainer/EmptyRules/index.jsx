import React from "react";
import EmptyState from "@sendgrid/ui-components/empty-state";

const EmptyRules = () => (
  <EmptyState icon="warning-triangle" header="No rules available.">
    <p>
      No rules are currently available to display. Please try reloading or
      contact an administrator if the problem persists.
    </p>
  </EmptyState>
);

export default EmptyRules;
