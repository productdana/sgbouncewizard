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

  bounceActivity(testRule) {
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
          return cy.get(`[data-time="${res[ruleToFind].created_at}"]`);
        }
        return false;
      });
  }

  open() {
    super.open("/activity_log");
  }
}

export default new ActivityLogPage();
