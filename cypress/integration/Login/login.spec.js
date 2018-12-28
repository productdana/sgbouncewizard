import LoginPage from "../../Pages/Login";
import BounceRulesPage from "../../pages/BounceRulesContainer";

describe("Login Page", () => {
  beforeEach(() => {
    LoginPage.open();
  });

  it("should pass healthchecks", () => {
    LoginPage.emailInput.should("be.visible");
    LoginPage.passwordInput.should("be.visible");
    LoginPage.loginButton.should("be.visible");
  });

  it("should successfully login with valid credentials", () => {
    const validCredentials = {
      email: "hadarziv@sg.com",
      password: "papa",
    };
    const { email, password } = validCredentials;
    LoginPage.login(email, password).then(() => {
      BounceRulesPage.page.should("be.visible");
    });
  });

  it("should show alert upon invalid credentials", () => {
    const invalidCredentials = {
      email: "wrongemail@sg.com",
      password: "papa",
    };
    const { email, password } = invalidCredentials;
    LoginPage.login(email, password).then(() => {
      LoginPage.invalidCredentialsAlert.should("be.visible");
    });
  });

  it("should show alert upon invalid input", () => {
    const invalidInput = {
      email: "",
      password: "papa",
    };
    const { email, password } = invalidInput;
    LoginPage.login(email, password).then(() => {
      LoginPage.invalidInputAlert.should("be.visible");
    });
  });
});
