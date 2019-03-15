import _ from "underscore";
import Page from "../page";
import { Selectors } from "../../../src/components/BounceDetailsContainer/selectors";

class BounceRuleDetailedPage extends Page {
  get details() {
    return cy.get(Selectors.details);
  }

  get detailsEditable() {
    return cy.get(Selectors.detailsEditable);
  }

  get changelog() {
    return cy.get(Selectors.changelog);
  }

  get editButton() {
    return cy.get(Selectors.editButton);
  }

  get saveButton() {
    return cy.get(Selectors.saveButton);
  }

  get cancelButton() {
    return cy.get(Selectors.cancelButton);
  }

  get description() {
    return cy.get(Selectors.description);
  }

  get bounceId() {
    return cy.get(Selectors.bounceId);
  }

  get responseCode() {
    return cy.get(Selectors.responseCode);
  }

  get enhancedCode() {
    return cy.get(Selectors.enhancedCode);
  }

  get regex() {
    return cy.get(Selectors.regex);
  }

  get priority() {
    return cy.get(Selectors.priority);
  }

  get bounceAction() {
    return cy.get(Selectors.bounceAction);
  }

  get changelogModal() {
    return cy.get(Selectors.changelogModal);
  }

  get confirmModal() {
    return cy.get(Selectors.confirmModal);
  }

  get cancelConfirmationModal() {
    return cy.get(Selectors.cancelConfirmationModal);
  }

  get commitInput() {
    return cy.get(Selectors.commitInput);
  }

  get confirmSubmit() {
    return cy.get(Selectors.confirmSubmit);
  }

  get testChangelog() {
    return cy.get(`${Selectors.changelog} tbody`).eq(0);
  }

  get firstChangelog() {
    return cy.get('[view-index="1"]');
  }

  open(ruleId) {
    return super.open(`/bounce_rules/${ruleId}`);
  }

  createTestRuleAPI(testRule) {
    return cy.task("createRule", {
      env: Cypress.env("testEnv"),
      data: testRule,
    });
  }

  updateRule(bounceRuleChange) {
    const {
      updatedDescription,
      updatedPriority,
      updatedBounceAction,
      updatedResponseCode,
      updatedEnhancedCode,
      updatedRegex,
      updatedCommit,
    } = bounceRuleChange;

    cy.server();
    cy.route("PUT", "/bounce_rules/*").as("editBounceRule");

    this.editButton.click();
    if (updatedDescription) {
      this.description.clear().type(updatedDescription);
    }
    if (updatedPriority) {
      this.priority.clear().type(updatedPriority);
    }
    if (updatedBounceAction) {
      this.bounceAction.clear().type(updatedBounceAction);
    }
    if (updatedResponseCode) {
      this.responseCode.clear().type(updatedResponseCode);
    }
    if (updatedEnhancedCode) {
      this.enhancedCode.clear().type(updatedEnhancedCode);
    }
    if (updatedRegex) {
      this.regex.clear().type(updatedRegex);
    }
    this.saveButton.click();
    if (updatedCommit) {
      this.commitInput.clear().type(updatedCommit);
    }

    this.confirmSubmit.click();
    return cy.wait("@editBounceRule", { timeout: 10000 });
  }

  teardownBounceRule(rule) {
    return cy.task("getRules", { env: Cypress.env("testEnv") }).then(res => {
      if (res) {
        const ruleIndex = _.findLastIndex(
          res,
          _.omit(rule, ["id", "created_at", "operation", "user_id", "comment"])
        );
        if (ruleIndex !== -1) {
          return cy.task("deleteRule", {
            env: Cypress.env("testEnv"),
            data: res[ruleIndex],
          });
        }
        return false;
      }
      return false;
    });
  }
}

export default new BounceRuleDetailedPage();
