import BounceRuleDetailedPage from "../../Pages/BounceRulesDetailed";

const testCreateRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 281,
  description: "cypressDetailedTest",
  enhanced_code: "384",
  regex: "kjfgsdlfg",
};
const updatedRule = {
  updatedDescription: "[Cypress Detailed Test - Updating Description]",
  updatedResponseCode: 1,
  updatedEnhancedCode: "10.2.5",
  updatedCommit: "[Cypress Detailed Test - Updating Commit]",
};

let ruleId;

describe("Bounce Rule Detailed", () => {
  before(() => {
    BounceRuleDetailedPage.teardownBounceRule(testCreateRule)
      .then(isTearDownSuccess => {
        if (isTearDownSuccess) {
          cy.wait(1000);
          return cy.log("Successfully tore down the bounce rule!");
        }
        return cy.log("Failed to tear down test bounce rule!");
      })
      .then(() => BounceRuleDetailedPage.createTestRuleAPI(testCreateRule))
      .then(createdRule => {
        if (createdRule) {
          cy.log(
            `Successfully created test bounce rule with rule ID ${
              createdRule.id
            }!`
          );
          ruleId = createdRule.id;
        } else {
          cy.log("Failed to create test bounce rule!");
          ruleId = createdRule.id;
        }
      });
  });

  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
    BounceRuleDetailedPage.open(ruleId);
  });

  it("should pass healthchecks", () => {
    BounceRuleDetailedPage.details.should("be.visible");
    BounceRuleDetailedPage.changelog.should("be.visible");
    BounceRuleDetailedPage.editButton.should("be.visible");
  });

  it("should edit a bounce rule", () => {
    BounceRuleDetailedPage.updateRule(updatedRule).then(() => {
      BounceRuleDetailedPage.firstChangelog.click().then(() => {
        BounceRuleDetailedPage.changelogModal.should("be.visible");
        BounceRuleDetailedPage.changelogModal.should(
          "contain",
          updatedRule.updatedDescription
        );
        BounceRuleDetailedPage.changelogModal.should(
          "contain",
          updatedRule.updatedEnhancedCode
        );
        BounceRuleDetailedPage.changelogModal.should(
          "contain",
          updatedRule.updatedResponseCode
        );
        BounceRuleDetailedPage.changelogModal.should(
          "contain",
          updatedRule.updatedCommit
        );
      });
    });
  });

  it("should display cancel modal if rule was modified", () => {
    BounceRuleDetailedPage.editButton.click();
    BounceRuleDetailedPage.description.clear().type("does not matter");
    BounceRuleDetailedPage.cancelButton.click();
    BounceRuleDetailedPage.cancelConfirmationModal.should("be.visible");
  });

  it("should not display cancel modal if rule was not modified", () => {
    BounceRuleDetailedPage.editButton.click();
    BounceRuleDetailedPage.cancelButton.click();
    BounceRuleDetailedPage.cancelConfirmationModal.should("be.not.visible");
  });

  it("should display confirm modal if rule was modified", () => {
    BounceRuleDetailedPage.editButton.click();
    BounceRuleDetailedPage.description.clear().type("does not matter");
    BounceRuleDetailedPage.saveButton.click();
    BounceRuleDetailedPage.saveConfirmationModal.should("be.visible");
  });

  it("should not display confirm modal if rule was not modified", () => {
    BounceRuleDetailedPage.editButton.click();
    BounceRuleDetailedPage.saveButton.click();
    BounceRuleDetailedPage.saveConfirmationModal.should("be.not.visible");
  });
});
