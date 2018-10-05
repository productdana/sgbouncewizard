import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Card } from "@sendgrid/ui-components";
import HelloWorld from "./components/HelloWorld";
import "./index.scss";

const TestComponent = () => <div>Test!</div>;

const App = () => (
  <div>
    <HelloWorld name="UCI Capstone" />
    <div style={{ width: "300px" }}>
      <Card title="SG Bounce Wizard" body="Manage your bounce rules" />
    </div>
    <Switch>
      <Route path="/test" exact component={TestComponent} />
    </Switch>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

export default App;
