import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./routes/login_page";
import BounceRulesContainer from "./routes/bounce_rules_page";
import BounceRuleDetailedPage from "./routes/bounce_rules_detailed";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/bounce_rules" component={BounceRulesContainer} />
      <Route
        path="/bounce_rules/:bounceRuleId"
        component={BounceRuleDetailedPage}
      />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
