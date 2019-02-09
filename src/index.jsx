import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./routes/login_page";
import BounceRulesContainer from "./routes/bounce_rules_page";
import BounceRuleDetailedPage from "./routes/bounce_rules_detailed";
import BounceRuleActivityLogPage from "./routes/bounce_rules_activity";
import PageNotFound from "./components/PageNotFound";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/bounce_rules" component={BounceRulesContainer} />
        <Route
          exact
          path="/activity_log"
          component={BounceRuleActivityLogPage}
        />
        <Route
          path="/bounce_rules/:bounceRuleId"
          component={BounceRuleDetailedPage}
        />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
