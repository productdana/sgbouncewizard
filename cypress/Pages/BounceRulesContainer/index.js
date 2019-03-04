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

  get cancelCreateRuleButton() {
    return cy.get(Selectors.cancelCreateRuleButton);
  }

  get ruleFilter() {
    return cy.get(Selectors.ruleFilter);
  }

  get ruleTable() {
    return cy.get(Selectors.ruleTable);
  }

  get cancelCreateConfirmationSubmit() {
    return cy.get(Selectors.cancelConfirmationSubmit);
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
    return cy.get(Selectors.bounceAction).find("input[type=text]");
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

  get commitMessage() {
    return cy.get(Selectors.commitMessage);
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
    return cy.get('[data-cypress="testDelete"]');
  }

  get emptyCommitAlert() {
    return cy.get(Selectors.emptyCommitAlert);
  }

  get testBounceRuleToCreate() {
    return cy.get('[data-cypress="testCreate"]');
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
            _.isEqual(testRule, _.omit(bounceRule, ["id", "created_at"]))
          );
          if (isMatchingBounceRule) {
            return cy.task("deleteRule", {
              env: Cypress.env("testEnv"),
              data: isMatchingBounceRule,
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

  selectOption(option) {
    this.getBounceActionSelectOption(option).click();
  }

  getBounceActionSelectOption(option) {
    return cy.get(Selectors.bounceAction).contains("[role='option']", option);
  }

  fillCreateRuleForm(bounceRule) {
    const {
      priority,
      bounce_action: bounceAction,
      response_code: responseCode,
      description,
      enhanced_code: enhancedCode,
      regex,
    } = bounceRule;

    if (priority) {
      this.priority.type(priority);
    }
    if (bounceAction) {
      this.bounceAction.type(bounceAction, { force: true });
      this.selectOption(bounceAction);
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
  }

  createBounceRuleUI(bounceRule) {
    const {
      priority,
      bounce_action: bounceAction,
      response_code: responseCode,
      description,
      enhanced_code: enhancedCode,
      regex,
      comment,
    } = bounceRule;

    this.createRuleButton.click();

    if (priority) {
      this.priority.type(priority);
    }
    if (bounceAction) {
      this.bounceAction.type(bounceAction, { force: true });
      this.selectOption(bounceAction);
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

    if (comment) {
      this.commitMessage.clear().type(comment);
    }

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
        return this.createdRuleButton(ruleToDelete.id).click();
      }
      return false;
    });
  }

  fillCommitUI(comment) {
    this.commitMessage.clear().type(comment);
  }
}

export default new BounceRulesPage();
