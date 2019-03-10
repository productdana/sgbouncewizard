import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./routes/login_page";
import BounceRulesPage from "./routes/bounce_rules_page";
import BounceDetailsPage from "./routes/bounce_details_page";
import BounceActivityPage from "./routes/bounce_activities_page";
import PageNotFound from "./components/shared/PageNotFound";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/bounce_rules" component={BounceRulesPage} />
        <Route exact path="/activity_log" component={BounceActivityPage} />
        <Route
          path="/bounce_rules/:bounceRuleId"
          component={BounceDetailsPage}
        />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
