import BounceRulesPage from "../../Pages/BounceRulesContainer";

describe("Bounce Rules Page", () => {
  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
    BounceRulesPage.open();
  });

  it("should pass healthchecks", () => {
    BounceRulesPage.page.should("be.visible");
    BounceRulesPage.breadcrumb.should("be.visible");
    BounceRulesPage.csvButton.should("be.visible");
    BounceRulesPage.createRuleButton.should("be.visible");
    BounceRulesPage.ruleFilter.should("be.visible");
    BounceRulesPage.ruleTable.should("be.visible");
  });

  it("should create a bounce rule", () => {
    BounceRulesPage.createRuleButton.click();
    BounceRulesPage.fillForm(
      "1",
      "cypressTest",
      "528",
      "testDescription",
      "492",
      "testRegex"
    );
    BounceRulesPage.confirmModal.should("be.visible");
    BounceRulesPage.confirmationSubmit.click();
    BounceRulesPage.testRule.should("be.visible");
  });

  it("should delete a bounce rule", () => {
    BounceRulesPage.testRule.click();
    BounceRulesPage.deleteConfirmationConfirm.click();
    BounceRulesPage.testRule.should("not.be.visible");
  });
});
