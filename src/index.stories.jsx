import React from "react";
import { storiesOf } from "@storybook/react";
import App from "./index";
import BounceRules from "./components/BounceRules";

storiesOf("App", module).addWithJSX("loaded", () => (
  <div style={{ backgroundColor: "white", height: "95vh", padding: 20 }}>
    <App />
  </div>
));

storiesOf("BounceRules", module).addWithJSX("rules", () => <BounceRules />);
