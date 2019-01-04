import BounceRuleDetailed from "../../Pages/BounceRulesDetailed";

const testCreateRule = {
  priority: 2,
  bounce_action: "cypressDetailedTest",
  response_code: 281,
  description: "cypressDetailedTest",
  enhanced_code: "384",
  regex: "kjfgsdlfg",
};
const updatedRule = {
  updatedDescription: "This is a new description from the Cypress Test!",
  updatedBounceAction: "This is a new bounce action from the Cypress Test!",
  updatedResponseCode: 999,
  updatedEnhancedCode: "10.2.5",
  updatedRegex: "cyress",
  updatedCommit: "This is a new commit from a Cypress Test",
  updatedPriority: 1,
};
let ruleId;

describe("Bounce Rule Detailed", () => {
  before(async () => {
    ruleId = await BounceRuleDetailed.createTestRuleAPI(testCreateRule);
  });

  beforeEach(() => {
    BounceRuleDetailed.open(ruleId);
  });

  after(() => {
    BounceRuleDetailed.deleteBounceRuleAPI(ruleId).then(isCleanupSuccess => {
      if (isCleanupSuccess) {
        cy.log("Cleanup successful");
      } else {
        cy.log("Cleanup failed");
      }
    });
  });

  it("should pass healthchecks", () => {
    BounceRuleDetailed.details.should("be.visible");
    BounceRuleDetailed.changelog.should("be.visible");
    BounceRuleDetailed.editButton.should("be.visible");
  });

  it("should edit a bounce rule", () => {
    BounceRuleDetailed.updateRule(updatedRule).then(() => {
      BounceRuleDetailed.firstChangelog.click().then(() => {
        BounceRuleDetailed.changelogModal.should("be.visible");
        BounceRuleDetailed.changelogModal.should(
          "contain",
          updatedRule.updatedDescription
        );
        BounceRuleDetailed.changelogModal.should(
          "contain",
          updatedRule.updatedBounceAction
        );
        BounceRuleDetailed.changelogModal.should(
          "contain",
          updatedRule.updatedEnhancedCode
        );
        BounceRuleDetailed.changelogModal.should(
          "contain",
          updatedRule.updatedRegex
        );
        BounceRuleDetailed.changelogModal.contains(
          "This is a new commit from a Cypress Test"
        );
      });
    });
  });
});
