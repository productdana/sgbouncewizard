import Page from "../page";
import { Selectors } from "../../../src/components/BounceRulesContainer/selectors";

class BounceRulesPage extends Page {
  open() {
    super.open("/bounce_rules");
  }

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

  fillForm(
    priority,
    bounceAction,
    responseCode,
    description,
    enhancedCode,
    regex
  ) {
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

    return this.submitButton.click();
  }
}

export default new BounceRulesPage();
