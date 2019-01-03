import BounceRuleDetailed from "../../Pages/BounceRulesDetailed";

const testCreateRule = {
  priority: 2,
  bounce_action: "cypressDetailedTest",
  response_code: 281,
  description: "cypressDetailedTest",
  enhanced_code: "384",
  regex: "kjfgsdlfg",
};

describe("Bounce Rule Detailed", () => {
  before(() => {
    BounceRuleDetailed.createTestRuleAPI(testCreateRule);
  });

  after(() => {
    BounceRuleDetailed.deleteBounceRuleAPI(testCreateRule);
  });

  // it("should pass healthchecks", () => {
  //   BounceRuleDetailed.open();
  //   BounceRuleDetailed.details.should("be.visible");
  //   BounceRuleDetailed.changelog.should("be.visible");
  //   BounceRuleDetailed.editButton.should("be.visible");
  // });
});
