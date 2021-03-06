import BounceRuleDetailedPage from "../../Pages/BounceRulesDetailed";

const testCreateRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 281,
  description: "bounce_rules_detailed_description_create",
  enhanced_code: "384",
  regex: "bounce_rules_detailed_regex_create",
};

const updatedRule = {
  updatedDescription: "bounce_rules_detailed_description_updated",
  updatedResponseCode: 1,
  updatedEnhancedCode: "10.2.5",
  updatedCommit: "[Cypress Detailed Test - Updating Commit]",
};

const newRule = {
  priority: 2,
  bounce_action: "no_action",
  response_code: 1,
  description: "bounce_rules_detailed_description_updated",
  enhanced_code: "10.2.5",
  regex: "bounce_rules_detailed_regex_create",
};

let ruleId;

describe("Bounce Rule Detailed", () => {
  before(() => {
    BounceRuleDetailedPage.teardownBounceRule(newRule)
      .then(() => BounceRuleDetailedPage.teardownBounceRule(testCreateRule))
      .then(isTearDownSuccess => {
        if (isTearDownSuccess) {
          return cy.log("Successfully tore down the bounce rule!");
        }
        return cy.log("Failed to tear down test bounce rule!");
      })
      .then(() => BounceRuleDetailedPage.createTestRuleAPI(testCreateRule))
      .then(createdRule => {
        if (createdRule) {
          cy.log(
            `Succesfully created test bounce rule with ID ${createdRule.id}`
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
});
