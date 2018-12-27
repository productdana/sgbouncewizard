import _ from "underscore";
import Page from "../page";
import { Selectors } from "../../../src/components/BounceRulesContainer/selectors";

class BounceRulesPage extends Page {
  get page() {
    return cy.get(Selectors.page);
  }

  get breadcrumb() {
    return cy.get(Selectors.breadcrumb);
  }

  get csvButton() {
    return cy.get(Selectors.csvButton);
  }

  get createRuleButton() {
    return cy.get(Selectors.createRuleButton);
  }

  get ruleFilter() {
    return cy.get(Selectors.ruleFilter);
  }

  get ruleTable() {
    return cy.get(Selectors.ruleTable);
  }

  get deleteConfirmation() {
    return cy.get(Selectors.deleteConfirmation);
  }

  get deleteConfirmationConfirm() {
    return cy.get(Selectors.deleteConfirmationConfirm);
  }

  get deleteConfirmationAlert() {
    return cy.get(Selectors.deleteConfirmationAlert);
  }

  get createRuleModal() {
    return cy.get(Selectors.createRuleModal);
  }

  get priority() {
    return cy.get(Selectors.priority);
  }

  get bounceAction() {
    return cy.get(Selectors.bounceAction);
  }

  get responseCode() {
    return cy.get(Selectors.responseCode);
  }

  get description() {
    return cy.get(Selectors.description);
  }

  get enhancedCode() {
    return cy.get(Selectors.enhancedCode);
  }

  get regex() {
    return cy.get(Selectors.regex);
  }

  get submitButton() {
    return cy.get(Selectors.submitButton);
  }

  get confirmModal() {
    return cy.get(Selectors.confirmModal);
  }

  get confirmationSubmit() {
    return cy.get(Selectors.confirmationSubmit);
  }

  get createdDeleteRuleAPI() {
    return cy.get('[data-cypress="cypressDeleteTest"]');
  }

  get createdCreateRuleAPI() {
    return cy.get('[data-cypress="cypressCreateTest"]');
  }

  open() {
    super.open("/bounce_rules");
  }

  createdRuleButton(id) {
    return cy.get(`[data-rule="${id}"]`);
  }

  deleteBounceRuleAPI(testRule) {
    return new Promise(resolve => {
      cy.task("getRules").then(res => {
        if (!res.errno) {
          for (let i = 0; i < res.length; i++) {
            if (_.isEqual(testRule, _.omit(res[i], "id"))) {
              cy.task("deleteRule", res[i].id);
              cy.log("DELETE SUCCESS");
            }
          }
        } else {
          cy.log("DELETE ERROR");
        }
        cy.reload().then(() => resolve());
      });
    });
  }

  createBounceRuleAPI(testRule) {
    return new Promise(resolve => {
      cy.task("createRule", testRule).then(res => {
        cy.reload().then(() => resolve(res.id));
      });
    });
  }

  createBounceRuleUI(bounceRule) {
    return new Promise(resolve => {
      const {
        priority,
        bounce_action: bounceAction,
        response_code: responseCode,
        description,
        enhanced_code: enhancedCode,
        regex,
      } = bounceRule;

      this.createRuleButton.click();

      if (priority) {
        this.priority.type(priority);
      }
      if (bounceAction) {
        this.bounceAction.type(bounceAction);
      }
      if (responseCode) {
        this.responseCode.type(responseCode);
      }
      if (description) {
        this.description.type(description);
      }
      if (enhancedCode) {
        this.enhancedCode.type(enhancedCode);
      }
      if (regex) {
        this.regex.type(regex);
      }

      resolve(this.submitButton.click());
    });
  }
}

export default new BounceRulesPage();
