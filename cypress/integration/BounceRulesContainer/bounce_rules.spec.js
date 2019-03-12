import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testDeleteRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 528,
  description: "rules_delete",
  enhanced_code: "492",
  regex: "rules_delete_comment",
  comment: "rules_delete_comment",
};

const testCreateRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 918,
  description: "rules_create",
  enhanced_code: "492",
  regex: "rules_create_regex",
  comment: "rules_create_comment",
};

describe("Bounce Rules Page", () => {
  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
  });

  it("should pass healthchecks", () => {
    BounceRulesPage.open();
    BounceRulesPage.page.should("be.visible");
    BounceRulesPage.csvButton.should("be.visible");
    BounceRulesPage.createRuleButton.should("be.visible");
    BounceRulesPage.ruleFilter.should("be.visible");
    BounceRulesPage.ruleTable.should("be.visible");
  });

  it("should create a bounce rule", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule)
      .then(() => BounceRulesPage.open())
      .then(() => BounceRulesPage.createBounceRuleUI(testCreateRule))
      .then(() =>
        BounceRulesPage.createdBounceRule(testCreateRule).should("be.visible")
      );
  });

  it("should delete a bounce rule", () => {
    BounceRulesPage.deleteBounceRuleAPI(testDeleteRule)
      .then(() => BounceRulesPage.createBounceRuleAPI(testDeleteRule))
      .then(() => BounceRulesPage.open())
      .then(() => BounceRulesPage.deleteBounceRuleUI(testDeleteRule))
      .then(() =>
        BounceRulesPage.createdBounceRule(testDeleteRule).should(
          "not.be.visible"
        )
      );
  });
});
