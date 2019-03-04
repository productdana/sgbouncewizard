import BounceRulesPage from "../../Pages/BounceRulesContainer";

const commitMessage = "a test commit message";

const testDeleteRule = {
  priority: 1,
  bounce_action: "no_action",
  response_code: 528,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testDelete",
  user_id: 0,
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

  it("should delete a bounce rule", () => {
    BounceRulesPage.deleteBounceRuleAPI(testDeleteRule).then(() => {
      BounceRulesPage.createBounceRuleAPI(testDeleteRule).then(() => {
        BounceRulesPage.open();
        BounceRulesPage.deleteBounceRuleUI(testDeleteRule);
        BounceRulesPage.fillCommitUI(commitMessage);
        BounceRulesPage.deleteConfirmationConfirm.click();
        BounceRulesPage.testBounceRuleToDelete.should("not.be.visible");
      });
    });
  });

  it("should be disabled if commit is empty", () => {
    BounceRulesPage.deleteBounceRuleAPI(testDeleteRule)
      .wait(1000)
      .then(() => {
        BounceRulesPage.createBounceRuleAPI(testDeleteRule).then(() => {
          BounceRulesPage.open();
          BounceRulesPage.deleteBounceRuleUI(testDeleteRule);
          BounceRulesPage.deleteConfirmationConfirm.should("be.disabled");
        });
      });
  });
});
