import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./routes/login_page";
import BounceRulesContainer from "./components/BounceRulesContainer";
import BounceRuleDetails from "./components/BounceRuleDetails";
import PageNotFound from "./components/PageNotFound";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/bounce_rules" component={BounceRulesContainer} />
        <Route
          path="/bounce_rules/:bounceRuleId"
          component={BounceRuleDetails}
        />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
