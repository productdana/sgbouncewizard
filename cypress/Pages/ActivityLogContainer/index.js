import _ from "underscore";
import Page from "../page";
import { Selectors } from "../../../src/components/BounceActivityContainer/selectors";

class ActivityLogPage extends Page {
  get page() {
    return cy.get(Selectors.page);
  }

  get breadcrumb() {
    return cy.get(Selectors.breadcrumb);
  }

  get csvButton() {
    return cy.get(Selectors.csvButton);
  }

  get activityFilter() {
    return cy.get(Selectors.activityFilter);
  }

  get activityTable() {
    return cy.get(Selectors.activityTable);
  }

  createdBounceRule(testRule) {
    return cy
      .task("getActivities", { env: Cypress.env("testEnv") })
      .then(res => {
        const ruleToFind = _.findLastIndex(
          res,
          _.omit(testRule, [
            "id",
            "created_at",
            "operation",
            "user_id",
            "comment",
          ])
        );
        if (ruleToFind) {
          return cy.get(`[data-id="${res[ruleToFind].id}"]`);
        }
        return false;
      });
  }

  open() {
    super.open("/activity_log");
  }
}

export default new ActivityLogPage();
