import React from "react";
import EmptyState from "@sendgrid/ui-components/empty-state";
import { WriteSelectors } from "../selectors";

const EmptyRules = () => (
  <div {...WriteSelectors.emptyRulesWarning}>
    <EmptyState icon="warning-triangle" header="No rules available.">
      <p>
        No rules are currently available to display. Please try reloading or
        contact an administrator if the problem persists.
      </p>
    </EmptyState>
  </div>
);

export default EmptyRules;
