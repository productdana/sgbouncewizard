import React from "react";
import { Row } from "@sendgrid/ui-components/grid/row";
import { Column } from "@sendgrid/ui-components/grid/column";
import { Button } from "@sendgrid/ui-components/button";
import { StatefulTextInput } from "@sendgrid/ui-components/text-input";
import { Alert } from "@sendgrid/ui-components/alert";
import "./index.scss";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      isAuthenticating: false,
      isAuthenticated: false,
      incorrectCredentials: false,
      hasNetworkError: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  updateField(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleLogin() {
    const { userName, password } = this.state;
    this.setState({
      isAuthenticating: true,
    });

    if (userName === "ziv" && password === "papa") {
      this.setState(prevState => ({
        isAuthenticated: !prevState.isAuthenticated,
      }));
    } else {
      this.setState(prevState => ({
        isShowingError: !prevState.isShowingError,
        incorrectCredentials: true,
        isAuthenticating: false,
      }));
    }
    // setTimeout(() => {
    //   if (userName === "ziv" && password === "papa") {
    //     this.setState(prevState => ({
    //       isAuthenticated: !prevState.isAuthenticated,
    //     }));
    //   } else {
    //     this.setState(prevState => ({
    //       isShowingError: !prevState.isShowingError,
    //       incorrectCredentials: true,
    //       isAuthenticating: false,
    //     }));
    //   }
    // }, 1000);
  }

  render() {
    const {
      isAuthenticating,
      isAuthenticated,
      hasNetworkError,
      incorrectCredentials,
    } = this.state;
    const redirectLink = "/bounce_rules";

    return isAuthenticated ? (
      <Redirect to={redirectLink} />
    ) : (
      <div className="login-container">
        <Row>
          <Column width={1} />
          <Column width={10}>
            {/* <div className="col-10 col-offset-1"></div> */}
            {/* <Column width={10} offset={1}/> */}
            <div className="login-form-container">
              <div className="login-logo">
                <img
                  id="sendgrid-login-logo"
                  src="https://uiux.s3.amazonaws.com/toggleable-logos/header-logo.svg"
                  alt="sg-logo"
                />
              </div>
              <Row width={2} />
              <Row width={8}>
                {incorrectCredentials && (
                  <Alert
                    data-test="invalid-credentials-alert"
                    type="danger"
                    dismissable={false}
                  >
                    Your username or password is invalid.
                  </Alert>
                )}
                {isAuthenticating &&
                  hasNetworkError && (
                    <Alert
                      data-test="network-error-alert"
                      type="danger"
                      dismissable={false}
                    >
                      Network Error
                    </Alert>
                  )}
              </Row>
              <div className="login-form-body">
                <Row>
                  <Column width={2} />
                  <Column width={8} offset={2}>
                    {/* <div className="col-4 col-offset-2"> */}
                    <div className="input-text-wrap">
                      <StatefulTextInput
                        data-test="username-field"
                        onChange={e => this.updateField(e, "userName")}
                        type="text"
                        label="Username"
                      />
                    </div>
                    {/* </div> */}
                  </Column>
                </Row>
                <Row>
                  <Column width={2} />
                  <Column width={8}>
                    <StatefulTextInput
                      onChange={e => this.updateField(e, "password")}
                      data-test="password-field"
                      type="password"
                      label="Password"
                    />
                  </Column>
                </Row>
                <Row>
                  <Column width={4} />
                  <Column width={4}>
                    <div className="login-button-container">
                      {!isAuthenticating &&
                        !hasNetworkError && (
                          <Button
                            data-test="login-button"
                            onClick={this.handleLogin}
                            type="primary"
                          >
                            Login
                          </Button>
                        )}
                      {isAuthenticating &&
                        !hasNetworkError && (
                          <Button
                            data-test="login-loading-button"
                            onClick={this.handleLogin}
                            type="primary"
                            loading
                          >
                            Login
                          </Button>
                        )}
                    </div>
                  </Column>
                </Row>
              </div>
            </div>
          </Column>
        </Row>
      </div>
    );
  }
}
