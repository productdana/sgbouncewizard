import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import BounceRulesContainer from "./components/BounceRulesContainer";
import BounceRuleDetails from "./components/BounceRuleDetails";
import "./index.scss";

const App = () => <div />;

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/bounce_rules" component={BounceRulesContainer} />
      <Route path="/bounce_rules/:bounceRuleId" component={BounceRuleDetails} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

export default App;
