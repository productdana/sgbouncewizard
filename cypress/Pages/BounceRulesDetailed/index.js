import _ from "underscore";
import Page from "../page";
import { Selectors } from "../../../src/components/BounceRuleDetailed/selectors";

class BounceRuleDetailed extends Page {
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

  get saveConfirmationModal() {
    return cy.get(Selectors.saveConfirmationModal);
  }

  get cancelConfirmationModal() {
    return cy.get(Selectors.cancelConfirmationModal);
  }

  open(ruleId) {
    super.open(`/bounce_rules/${ruleId}`);
  }

  createTestRuleAPI(testRule) {
    return cy.task("createRule", testRule);
  }

  deleteBounceRuleAPI(id) {
    return cy.task("getRules").then(res => {
      if (res) {
        for (let i = 0; i < res.length; i++) {
          if (_.isEqual(id, res[i].id)) {
            cy.log("DELETE SUCCESFULL");
            return cy.task("deleteRule", res[i].id);
          }
        }
        return true;
      }
      return false;
    });
  }
}

export default new BounceRuleDetailed();
