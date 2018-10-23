import React from "react";
import { Redirect } from "react-router-dom";
import cn from "classnames";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isShowingError: false,
      userName: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  updateField(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleLogin() {
    const { userName, password } = this.state;

    if (userName === "ziv" && password === "papa") {
      this.setState(prevState => ({
        isAuthenticated: !prevState.isAuthenticated
      }));
    } else {
      this.setState(prevState => ({
        isShowingError: !prevState.isShowingError
      }));
    }
  }

  render() {
    const { isAuthenticated, isShowingError } = this.state;
    const redirectLink = "/bounce_rules";

    return isAuthenticated ? (
      <Redirect to={redirectLink} />
    ) : (
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            className="card is-centered"
            style={{
              width: "30rem",
              height: "30rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              className="login-title"
              style={{
                fontWeight: "bold"
              }}
            >
              SendGrid
            </div>
            {isShowingError && (
              <div style={{ color: "#b71c1c", marginTop: "1rem" }}>
                Incorrect Credentials
              </div>
            )}
            <div
              className="login-form"
              style={{
                marginBottom: "2rem",
                width: "20rem"
              }}
            >
              <div className="input-text-wrap">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={e => this.updateField(e, "userName")}
                />
              </div>
              <div className="input-text-wrap">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={e => this.updateField(e, "password")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
