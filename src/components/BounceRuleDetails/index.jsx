import React from "react";
import PropTypes from "prop-types";

export default class BounceRuleDetails extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    this.state = {
      currentRule: location.state.currentRule
    };
  }

  render() {
    const { currentRule } = this.state;

    return (
      <div
        className="row"
        style={{
          marginTop: "2rem",
          height: "100vh",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "50rem"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              Log Out
            </a>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 0"
            }}
          >
            <div
              style={{
                width: "20rem",
                fontSize: "2rem"
              }}
            >
              Bounce Rule Details
            </div>
            <button type="submit" className="btn btn-primary">
              Create a Bounce Rule
            </button>
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "1.5rem",
              margin: "2rem 0"
            }}
          >
            {currentRule.description}
          </div>
          <div>Changelog</div>
        </div>
      </div>
    );
  }
}

BounceRuleDetails.propTypes = {
  location: PropTypes.object
};

BounceRuleDetails.defaultProps = {
  location: {}
};
