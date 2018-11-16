import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./routes/login_page";
<<<<<<< HEAD
import BounceRulesContainer from "./routes/bounce_rules_page";
import BounceRuleDetailedPage from "./routes/bounce_rules_detailed";
import PageNotFound from "./components/PageNotFound";
=======
import BounceRulesContainer from "./components/BounceRulesContainer";
import BounceRuleDetailedPage from "./routes/bounce_rules_detailed";
>>>>>>> detailed backbone
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
<<<<<<< HEAD
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/bounce_rules" component={BounceRulesContainer} />
        <Route
          path="/bounce_rules/:bounceRuleId"
          component={BounceRuleDetailedPage}
        />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
=======
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/bounce_rules" component={BounceRulesContainer} />
      <Route
        path="/bounce_rules/:bounceRuleId"
        component={BounceRuleDetailedPage}
      />
>>>>>>> detailed backbone
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
