import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testDeleteRule = {
  priority: 1,
  bounce_action: "cypressDeleteTest",
  response_code: 528,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testRegex",
};

const testCreateRule = {
  priority: 2,
  bounce_action: "cypressCreateTest",
  response_code: 918,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testRegex",
  comment: "init commit test",
};

describe("Bounce Rules Page", () => {
  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
  });

  it("should pass healthchecks", () => {
    BounceRulesPage.open();
    BounceRulesPage.page.should("be.visible");
    BounceRulesPage.breadcrumb.should("be.visible");
    BounceRulesPage.csvButton.should("be.visible");
    BounceRulesPage.createRuleButton.should("be.visible");
    BounceRulesPage.ruleFilter.should("be.visible");
    BounceRulesPage.ruleTable.should("be.visible");
  });

  it("should create a bounce rule", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.open();
      BounceRulesPage.createBounceRuleUI(testCreateRule);
      BounceRulesPage.testBounceRuleToCreate.should("be.visible");
    });
  });

  it("should delete a bounce rule", () => {
    BounceRulesPage.createBounceRuleAPI(testDeleteRule).then(() => {
      BounceRulesPage.open();
      BounceRulesPage.deleteBounceRuleUI(testDeleteRule);
      BounceRulesPage.testBounceRuleToDelete.should("not.be.visible");
    });
  });
});
