import BounceActivityPage from "../../Pages/ActivityLogContainer";
import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 999,
  description: "test_from_bounce_activities_test",
  enhanced_code: "001",
  regex: "regex_from_bounce_activities_test",
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

  it("should display new rule after it was created", () => {
    BounceRulesPage.deleteBounceRuleAPI(testRule).then(() => {
      BounceRulesPage.createBounceRuleUI(testRule);
      BounceActivityPage.open();
      BounceActivityPage.createdBounceRule(testRule).should("be.visible");
    });
  });
});
