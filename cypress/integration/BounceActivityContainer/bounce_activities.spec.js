import BounceActivityPage from "../../Pages/ActivityLogContainer";
import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testCreateRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 999,
  description: "test_from_bounce_activities_test",
  enhanced_code: "001",
  regex: "regex_from_bounce_activities_test",
};

const testDeleteRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 998,
  description: "test_from_bounce_activities_test_delete",
  enhanced_code: "002",
  regex: "regex_from_bounce_activities_test_delete",
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
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.createBounceRuleUI(testCreateRule);
      BounceActivityPage.open();
      BounceActivityPage.bounceActivity(testCreateRule).should("be.visible");
    });
  });

  it("should display new actvity after it was deleted", () => {
    BounceRulesPage.deleteBounceRuleAPI(testDeleteRule).then(() => {
      BounceRulesPage.createBounceRuleUI(testDeleteRule);
      BounceRulesPage.createdBounceRule(testDeleteRule).then(() => {
        BounceRulesPage.deleteBounceRuleUI(testDeleteRule);
        BounceActivityPage.open();
        BounceActivityPage.bounceActivity(testDeleteRule).should("be.visible");
      });
    });
  });
});
