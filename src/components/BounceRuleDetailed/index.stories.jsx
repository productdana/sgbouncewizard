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
  response_code: 550,
  enhanced_code: "",
  regex: "no MX record for domain",
  priority: 0,
  description:
    "mainly liberty domain block seeing ~50% of addresses engaging SG wide",
  bounce_action: "no_action",
  created_by: 99,
};

const sampleChangelog = {
  id: 300,
  response_code: 552,
  enhanced_code: "4.2.2",
  regex: "User has full mailbox",
  priority: 0,
  description:
    "message will not succeed when retried, but address is likely valid",
  bounce_action: "no_action",
  user_id: 1,
  created_at: 1542594709,
  comment: "Testing changelog 1",
};

class BounceRuleDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: sampleRule,
      updatedRule: sampleRule,
      isEditClicked: false,
      changelog: [sampleChangelog],
      ...this.props,
    };

    this.onChangeRule = this.onChangeRule.bind(this);
  }

  onChangeRule(e) {
    const { id, value } = e.currentTarget;
    const { updatedRule } = this.state;
    this.setState({
      updatedRule: { ...updatedRule, [id]: value },
    });
  }

  render() {
    const {
      render,
      currentRule,
      updatedRule,
      isEditClicked,
      changelog,
    } = this.state;
    return (
      <div>
        {render(
          this.onChangeRule,
          currentRule,
          updatedRule,
          isEditClicked,
          changelog
        )}
      </div>
    );
  }
}

storiesOf("Bounce Rule Details", module)
  .addDecorator(StoryRouter())
  .add("Default", () => <DetailsContainer currentRule={sampleRule} />)
  .add("Editable", () => (
    <BounceRuleDetailsContainer
      render={(
        onChangeRule,
        currentRule,
        updatedRule,
        isEditClicked,
        changelog
      ) => (
        <DetailsContainerEditable
          currentRule={currentRule}
          updatedRule={updatedRule}
          onChangeRule={onChangeRule}
          onChangeRuleInt={onChangeRule}
          changelog={changelog}
        />
      )}
    />
  ));

storiesOf("Bounce Rule Changelog", module)
  .add("Default", () => (
    <BounceRuleDetailsContainer
      render={(
        onChangeRule,
        currentRule,
        updatedRule,
        isEditClicked,
        changelog
      ) => <Changelog changelog={changelog} />}
    />
  ))
  .add("Empty", () => <Changelog changelog={[]} isChangelogEmpty />);

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
