import React from "react";
import { Redirect } from "react-router-dom";
import authenticateUser from "../../utils/authenticate";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isShowingError: false,
      errorMessage: "Incorrect credentials",
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  updateField(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }

  async handleLogin() {
    const { email, password } = this.state;

    const { data, status } = await authenticateUser({ email, password });

    if (status === 200) {
      if (data.id !== 0) {
        this.setState(prevState => ({
          isAuthenticated: !prevState.isAuthenticated,
        }));
      } else {
        this.setState(prevState => ({
          isShowingError: !prevState.isShowingError,
        }));
      }
    } else {
      this.setState(prevState => ({
        isShowingError: !prevState.isShowingError,
        errorMessage: "User does not exist",
      }));
    }
  }

  render() {
    const { isAuthenticated, isShowingError, errorMessage } = this.state;
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
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
              alignItems: "center",
            }}
          >
            <div
              className="login-title"
              style={{
                fontWeight: "bold",
              }}
            >
              SendGrid
            </div>
            {isShowingError && (
              <div style={{ color: "#b71c1c", marginTop: "1rem" }}>
                {errorMessage}
              </div>
            )}
            <div
              className="login-form"
              style={{
                marginBottom: "2rem",
                width: "20rem",
              }}
            >
              <div className="input-text-wrap">
                <input
                  type="text"
                  placeholder="email"
                  onChange={e => this.updateField(e, "email")}
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
