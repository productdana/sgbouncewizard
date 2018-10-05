import React from "react";
import ReactDOM from "react-dom";
import { Card } from "@sendgrid/ui-components";
import HelloWorld from "./components/HelloWorld";
import "./index.scss";

const App = () => (
  <div>
    <HelloWorld name="UCI Capstone" />
    <div style={{ width: "300px" }}>
      <Card title="SG Bounce Wizard" body="Manage your bounce rules" />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
