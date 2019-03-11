import BounceActivityPage from "../../Pages/ActivityLogContainer";
import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testCreateRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 999,
  description: "act_create",
  enhanced_code: "001",
  regex: "act_create_regex",
  comment: "act_create_commit",
};

const testDeleteRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 998,
  description: "act_delete",
  enhanced_code: "002",
  regex: "act_delete_regex",
  comment: "act_delete_comment",
};

describe("Bounce Activity Page", () => {
  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
  });

  it("should pass healthchecks", () => {
    BounceActivityPage.open();
    BounceActivityPage.page.should("be.visible");
    BounceActivityPage.csvButton.should("be.visible");
    BounceActivityPage.activityFilter.should("be.visible");
    BounceActivityPage.activityTable.should("be.visible");
  });

  it("should display new actvity after it was created", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule)
      .then(() => BounceRulesPage.createBounceRuleUI(testCreateRule))
      .then(() => BounceActivityPage.open())
      .then(() =>
        BounceActivityPage.bounceActivity(testCreateRule).should("be.visible")
      );
  });

  it("should display new actvity after it was deleted", () => {
    BounceRulesPage.deleteBounceRuleAPI(testDeleteRule)
      .then(() => BounceRulesPage.createBounceRuleAPI(testDeleteRule))
      .then(() => BounceRulesPage.open())
      .then(() => BounceRulesPage.createdBounceRule(testDeleteRule))
      .then(() => BounceRulesPage.deleteBounceRuleUI(testDeleteRule))
      .then(() => BounceActivityPage.open())
      .then(() =>
        BounceActivityPage.bounceActivity(testDeleteRule).should("be.visible")
      );
  });
});
