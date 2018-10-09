import React from "react";
import { Redirect } from "react-router-dom";
import "./BounceRules.css";

export default class BounceRules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchToken: "",
      isRedirectingToDetail: false,
      selectedRule: {},
    };

    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleRuleClick(rule) {
    this.setState(prevProps => ({
      isRedirectingToDetail: !prevProps.isRedirectingToDetail,
      selectedRule: rule,
    }));
  }

  handleKeyDown(rule) {
    this.setState(prevProps => ({
      isRedirectingToDetail: !prevProps.isRedirectingToDetail,
      selectedRule: rule,
    }));
  }

  updateSearchToken(e) {
    this.setState({
      searchToken: e.target.value.toLowerCase(),
    });
  }

  filterRules(rules) {
    const { searchToken } = this.state;

    return rules.filter(
      rule =>
        rule.action.toLowerCase().includes(searchToken) ||
        rule.description.toLowerCase().includes(searchToken) ||
        rule.lastCommit.toLowerCase().includes(searchToken)
    );
  }

  render() {
    const { isRedirectingToDetail, selectedRule } = this.state;

    const proxyBounceRules = [
      {
        action: "Bounce1 Action",
        description: "Server Timeout",
        lastCommit: "N/A",
        id: 1,
      },
      {
        action: "Bounce2 Action",
        description: "Invalid IP",
        lastCommit: "N/A",
        id: 2,
      },
      {
        action: "Bounce3 Action",
        description: "Other",
        lastCommit: "N/A",
        id: 3,
      },
      {
        action: "Bounce4 Action",
        description: `Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit 
          in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt 
          mollit anim id est laborum.`,
        lastCommit: "N/A",
        id: 4,
      },
      {
        action: "Bounce5 Action",
        description: "Other",
        lastCommit: "N/A",
        id: 5,
      },
    ];

    const filteredRules = this.filterRules(proxyBounceRules);

    return isRedirectingToDetail ? (
      <Redirect
        push
        to={{
          pathname: `/bounce_rules/${selectedRule.id}`,
          state: { currentRule: selectedRule },
        }}
      />
    ) : (
      <div
        className="row"
        style={{
          marginTop: "4rem",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div />
            <div style={{ fontSize: "2rem", fontWeight: "500" }}>
              Bounce Wizard
            </div>
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              Log Out
            </a>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <input
              style={{
                border: "1px solid black",
                padding: "1rem",
                width: "20rem",
              }}
              onChange={this.updateSearchToken}
              placeholder="Search By:"
            />
            <button type="submit" className="btn btn-primary">
              Create a Bounce Rule
            </button>
          </div>
          {filteredRules.map(rule => (
            <div
              key={rule.id}
              className="bounceRules-ruleContainer"
              style={{
                border: "0.125rem solid grey",
                padding: "2rem",
                margin: "3rem 0",
              }}
              onClick={() => this.handleRuleClick(rule)}
              onKeyDown={() => this.handleKeyDown(rule)}
              role="button"
              tabIndex="0"
            >
              <div>Bounce Action: {rule.action}</div>
              <div>Description: {rule.description}</div>
              <div>Last Commit Message: {rule.lastCommit}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
