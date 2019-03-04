import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testDeleteRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 528,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testDelete",
};

const testCreateRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 918,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testCreate",
  comment: "init commit test",
};

const neverCreatedRule = {
  priority: 3,
  bounce_action: "no_action",
  response_code: 314,
  description: "Never Created",
  enhanced_code: "500",
  regex: "neverCreated",
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
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.open();
      BounceRulesPage.createBounceRuleUI(testCreateRule);
      BounceRulesPage.testBounceRuleToCreate.should("be.visible");
    });
  });

  it("should cancel creating a bounce rule before submitting", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.open();
      BounceRulesPage.createRuleButton.click();
      BounceRulesPage.cancelCreateRuleButton.click();
      BounceRulesPage.createRuleModal.should("not.be.visible");
    });
  });

  it("should cancel creating a bounce rule after submitting", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.open();
      BounceRulesPage.createRuleButton.click();
      BounceRulesPage.fillCreateRuleForm(neverCreatedRule);
      BounceRulesPage.cancelCreateConfirmationSubmit.click();
      BounceRulesPage.confirmModal.should("not.be.visible");
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
