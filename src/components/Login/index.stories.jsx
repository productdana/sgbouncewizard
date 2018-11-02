import React from "react";
import { storiesOf } from "@storybook/react";
import Login from "./index";

storiesOf("Login", module)
  .add("Empty Default", () => <Login />)
  .add("Some Inputs", () => (
    <Login username="testusername" password="testpassword" />
  ));
// TODO: add more storybook stories based on all the variations of props now
// We can now see all the variations of loading and error states and normal states
