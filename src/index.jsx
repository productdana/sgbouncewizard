import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./routes/login_page";
import BounceRulesContainer from "./routes/bounce_rules_page";
import BounceRuleDetails from "./components/BounceRuleDetails";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div style={{ height: "100%" }}>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/bounce_rules" component={BounceRulesContainer} />
      <Route path="/bounce_rules/:bounceRuleId" component={BounceRuleDetails} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
