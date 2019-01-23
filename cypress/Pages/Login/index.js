import Page from "../page";
import { Selectors } from "../../../src/components/Login/selectors";

class LoginPage extends Page {
  get loginContainer() {
    return cy.get(Selectors.loginContainer);
  }

  get emailInput() {
    return cy.get(Selectors.emailInput);
  }

  get passwordInput() {
    return cy.get(Selectors.passwordInput);
  }

  get loginButton() {
    return cy.get(Selectors.loginButton);
  }

  get invalidCredentialsAlert() {
    return cy.get(Selectors.invalidCredentialsAlert);
  }

  get invalidInputAlert() {
    return cy.get(Selectors.invalidInputAlert);
  }

  get networkErrorAlert() {
    return cy.get(Selectors.networkErrorAlert);
  }

  open() {
    super.open("/");
  }

  login(email, password) {
    if (email) {
      this.emailInput.type(email);
    }

    if (password) {
      this.passwordInput.type(password);
    }

    return this.loginButton.click();
  }
}

export default new LoginPage();
