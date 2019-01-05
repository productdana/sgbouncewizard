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

  get testBounceRuleToDelete() {
    return cy.get('[data-cypress="cypressDeleteTest"]');
  }

  get testBounceRuleToCreate() {
    return cy.get('[data-cypress="cypressCreateTest"]');
  }

  open() {
    super.open("/bounce_rules");
  }

  createdRuleButton(id) {
    return cy.get(`[data-rule="${id}"]`);
  }

  deleteBounceRuleAPI(testRule) {
    return cy
      .task("getRules", { env: Cypress.env("testEnv") })
      .then(res => {
        if (res) {
          const isMatchingBounceRule = res.find(bounceRule =>
            _.isEqual(testRule, _.omit(bounceRule, "id"))
          );
          if (isMatchingBounceRule) {
            return cy.task("deleteRule", {
              env: Cypress.env("testEnv"),
              id: isMatchingBounceRule.id,
            });
          }
          return true;
        }
        return false;
      })
      .then(result => {
        if (result) {
          cy.log(result);
          return cy.log("Delete Successful");
        }
        return cy.log("Delete Unsuccessful");
      });
  }

  createBounceRuleAPI(testRule) {
    return cy.task("createRule", {
      env: Cypress.env("testEnv"),
      data: testRule,
    });
  }

  createBounceRuleUI(bounceRule) {
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

    this.submitButton.click();
    this.confirmModal.should("be.visible");
    return this.confirmationSubmit.click();
  }

  deleteBounceRuleUI(testRule) {
    cy.task("getRules", { env: Cypress.env("testEnv") }).then(res => {
      const ruleToDelete = res.find(bounceRule =>
        _.isEqual(
          testRule,
          _.omit(bounceRule, ["id", "created_at", "user_id", "comment"])
        )
      );
      if (ruleToDelete) {
        this.createdRuleButton(ruleToDelete.id).click();
        return this.deleteConfirmationConfirm.click();
      }
      // for (let i = 0; i < res.length; i++) {
      //   if (
      //     _.isEqual(
      //       testRule,
      //       _.omit(res[i], ["id", "created_at", "user_id", "comment"])
      //     )
      //   ) {
      //     cy.log("FOUND RULE!");
      //     this.createdRuleButton(res[i].id).click();
      //     return this.deleteConfirmationConfirm.click();
      //   }
      // }
      return false;
    });
  }
}

export default new BounceRulesPage();
