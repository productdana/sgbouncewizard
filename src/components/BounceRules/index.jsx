import React from "react";
import { Redirect } from "react-router-dom";
import "./BounceRules.css";
import axios from "axios";

export default class BounceRules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchToken: "",
      isRedirectingToDetail: false,
      selectedRule: {},
      rules: [],
      pageIndex: 1,
      pageInterval: 10,
    };

    this.updateSearchToken = this.updateSearchToken.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async componentDidMount() {
    const { data, status } = await axios.get(
      "http://localhost:3000/bounce_rules"
    );
    if (status === 200) {
      const { rules, numRules } = data;
      this.setState({
        rules,
        numRules,
      });
    }
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
        rule.bounce_action.toLowerCase().includes(searchToken) ||
        rule.description.toLowerCase().includes(searchToken)
    );
  }

  paginate(rules) {
    const { pageIndex, pageInterval } = this.state;
    return rules.slice(pageIndex - 1, pageIndex - 1 + pageInterval);
  }

  updatePageIndex(newIndex) {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex !== newIndex ? newIndex : prevState.pageIndex,
    }));
  }

  render() {
    const {
      isRedirectingToDetail,
      pageIndex,
      selectedRule,
      rules,
      numRules,
    } = this.state;
    const filteredRules = this.filterRules(this.paginate(rules));

    const endPage = pageIndex + (5 - (pageIndex % 5 === 0 ? 5 : pageIndex % 5));
    const startPage = endPage - 4;

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
          <div>
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
                <div>Bounce Action: {rule.bounce_action}</div>
                <div style={{ wordWrap: "break-word" }}>
                  Description: {rule.description}
                </div>
                <div>Last Commit Message: </div>
              </div>
            ))}
            <div className="pagination">
              <a
                className="btn btn-secondary btn-small pagination-prev"
                onClick={() =>
                  this.setState(prevState => ({
                    pageIndex:
                      prevState.pageIndex > 1 ? prevState.pageIndex - 1 : 0,
                  }))
                }
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                Prev
              </a>
              <div className="pagination-links">
                {Array(endPage - startPage + 1)
                  .fill()
                  .map((_, i) => startPage + i)
                  .map(number => (
                    <a
                      key={number}
                      className={`pagination-link ${
                        number === pageIndex ? " is-active" : ""
                      }`}
                      onClick={() => this.updatePageIndex(number)}
                      onKeyDown={() => {}}
                      role="button"
                      tabIndex="0"
                    >
                      {number}
                    </a>
                  ))}
                <a className="pagination-ellipses">&hellip;</a>
                <a
                  className="pagination-link"
                  onClick={() => this.updatePageIndex(numRules)}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex="0"
                >
                  {numRules}
                </a>
              </div>
              <a
                className="btn btn-secondary btn-small pagination-next"
                onClick={() =>
                  this.setState(prevState => ({
                    pageIndex: prevState.pageIndex + 1,
                  }))
                }
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
