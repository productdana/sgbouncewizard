import React from "react";
import { storiesOf } from "@storybook/react";
import App from "./index";

storiesOf("App", module).addWithJSX("loaded", () => (
  <div style={{ backgroundColor: "white", height: "95vh", padding: 20 }}>
    <App />
  </div>
));
