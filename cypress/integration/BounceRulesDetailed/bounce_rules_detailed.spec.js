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
  });

  beforeEach(() => {
    BounceRuleDetailed.open(ruleId);
  });

  after(() => {
    BounceRuleDetailed.deleteBounceRuleAPI(ruleId);
  });

  it("should pass healthchecks", () => {
    BounceRuleDetailed.details.should("be.visible");
    BounceRuleDetailed.changelog.should("be.visible");
    BounceRuleDetailed.editButton.should("be.visible");
  });

  it("should edit a bounce rule", () => {
    BounceRuleDetailed.updateRule().then(() => {
      BounceRuleDetailed.testChangelog.contains(
        "This is a new commit from a Cypress Test"
      );
    });
  });

  it("should view a change", () => {
    BounceRuleDetailed.viewChangelog().then(() => {
      BounceRuleDetailed.changelogModal.should("be.visible");
    });
  });
});
