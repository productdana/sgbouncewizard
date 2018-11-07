import React from "react";

const BounceRuleDetailed = ({ currentRule }) => (
  <div
    className="row"
    style={{
      marginTop: "2rem",
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
          justifyContent: "flex-end",
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
          margin: "1rem 0",
        }}
      >
        <div
          style={{
            width: "20rem",
            fontSize: "2rem",
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
          margin: "2rem 0",
        }}
      >
        {currentRule.description}
      </div>
      <div>Changelog</div>
    </div>
  </div>
);

export default BounceRuleDetailed;
