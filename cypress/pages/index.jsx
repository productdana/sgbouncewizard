import selectors from "../selectors/Login";

class LoginPage {
  constructor() {
    this.selectors = selectors;
  }

  get emailInput() {
    return cy.get(this.selectors.loginEmailInput);
  }

  get passwordInput() {
    return cy.get(this.selectors.loginPasswordInput);
  }

  get submitButton() {
    return cy.get(this.selectors.loginSubmitButton);
  }

  get networkError() {
    return cy.get(this.selectors.loginNetworkError);
  }

  get invalidInput() {
    return cy.get(this.selectors.loginInvalidInput);
  }

  get invalidCredentials() {
    return cy.get(this.selectors.loginInvalidCredentials);
  }

  validLogin() {
    cy.server();
    this.emailInput
      .type("hadarziv@sg.com")
      .should("have.value", "hadarziv@sg.com");
    this.passwordInput.type("papa").should("have.value", "papa");
    cy.route("GET", "/bounce_rules").as("getRules");
    this.submitButton.click();
    cy.wait("@getRules")
      .its("status")
      .should("eq", 200)
      .get("[data-test='bounce-rules-page']")
      .should("be.visible");
  }

  invalidInputLogin() {
    this.passwordInput.type("papa");
    this.submitButton.click();
    this.invalidInput.should("be.visible");
  }

  invalidCredentialsLogin() {
    cy.server();
    this.emailInput.type("wrongemail@sg.com");
    this.passwordInput.type("papa");
    cy.route("GET", "/bounce_rules").as("getRules");
    this.submitButton.click();
    cy.wait(1000);
    this.invalidCredentials.should("be.visible");
  }
}

export default LoginPage;
