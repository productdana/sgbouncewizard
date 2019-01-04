import BounceRuleDetailed from "../../Pages/BounceRulesDetailed";

const testCreateRule = {
  priority: 2,
  bounce_action: "cypressDetailedTest",
  response_code: 281,
  description: "cypressDetailedTest",
  enhanced_code: "384",
  regex: "kjfgsdlfg",
};
let ruleId;

describe("Bounce Rule Detailed", () => {
  before(async () => {
    ruleId = await BounceRuleDetailed.createTestRuleAPI(testCreateRule);
    cy.log(ruleId);
  });

  after(() => {
    BounceRuleDetailed.deleteBounceRuleAPI(ruleId);
  });

  it("should pass healthchecks", () => {
    BounceRuleDetailed.open(ruleId);
    BounceRuleDetailed.details.should("be.visible");
    BounceRuleDetailed.changelog.should("be.visible");
    BounceRuleDetailed.editButton.should("be.visible");
  });
});
