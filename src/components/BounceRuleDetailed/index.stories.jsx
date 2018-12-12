import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import StoryRouter from "storybook-react-router";
import "./index.scss";
import DetailsContainer, { DetailsContainerEditable } from "./Details";
import Changelog from "./Changelog";
import ChangeModal from "./Modals/ChangeModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import CancelConfirmationModal from "./Modals/CancelConfirmationModal";

const sampleRule = {
  id: 504,
  response_code: "550",
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description:
    "bWFpbmx5IGxpYmVydHkgZG9tYWluIGJsb2NrIHNlZWluZyB+NTAlIG9mIGFkZHJlc3NlcyBlbmdhZ2luZyBTRyB3aWRl",
  bounce_action: "no_action",
};

storiesOf("Bounce Rule Details", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <DetailsContainer
      currentRule={sampleRule}
      handleButtonClicked={action("clicked")}
    />
  ))
  .add("Editable", () => (
    <DetailsContainerEditable
      currentRule={sampleRule}
      handleButtonClicked={action("clicked")}
    />
  ));

storiesOf("Bounce Rule Changelog", module)
  .add("Default", () => (
    <Changelog handleButtonClicked={action("change clicked")} />
  ))
  .add("Empty", () => (
    // Not yet implemented
    <Changelog handleButtonClicked={action("change clicked")} />
  ));

storiesOf("Modals", module)
  .add("Change Log Modal", () => (
    <ChangeModal
      currentRule={sampleRule}
      handleModalClose={action("close modal")}
      handleModalConfirm={action("open modal")}
    />
  ))
  .add("Confirmation Modal", () => (
    <ConfirmationModal
      currentRule={sampleRule}
      handleModalClose={action("close modal")}
      handleModalConfirm={action("open modal")}
    />
  ))
  .add("Cancellation Modal", () => (
    <CancelConfirmationModal
      currentRule={sampleRule}
      handleModalClose={action("close modal")}
      handleModalConfirm={action("open modal")}
    />
  ));
