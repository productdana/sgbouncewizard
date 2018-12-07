import LoginPage from "../../pages";
// / <reference types="Cypress" />

const loginPage = new LoginPage();

describe("Login", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("should render input fields", () => {
    loginPage.emailInput.should("be.visible");
    loginPage.passwordInput.should("be.visible");
    loginPage.submitButton.should("be.visible");
  });

  it("should succesfully login", () => {
    loginPage.validLogin();
  });

  it("should alert when invalid input", () => {
    loginPage.invalidInputLogin();
  });

  it("should alert when invalid credentials", () => {
    loginPage.invalidCredentialsLogin();
  });
});
