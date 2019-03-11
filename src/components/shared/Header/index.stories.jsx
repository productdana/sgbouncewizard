import React from "react";
import { storiesOf } from "@storybook/react";
import Header from ".";

storiesOf("Header", module)
  .add("Default", () => <Header name="Kenny" />)
  .add("No Name", () => <Header />);
