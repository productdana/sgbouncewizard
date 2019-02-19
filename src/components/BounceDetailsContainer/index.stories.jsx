import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import StoryRouter from "storybook-react-router";
import "./index.scss";
import BounceRuleDetailed from ".";
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
  comment: "example comment",
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

const store = {
  currentRule: sampleRule,
  updatedRule: sampleRule,
  changelog: [sampleChangelog],
  isEditClicked: false,
  isChangeModalOpen: false,
  isCancelConfirmOpen: false,
  isConfirmOpen: false,
  isUpdateError: false,
  pageIndex: 1,
  pageInterval: 10,
  pagesToDisplay: 5,
  isNetworkError: false,
  changelogLimit: 10,
};

class DetailsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...store,
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
    const { render } = this.state;
    return <div>{render({ ...this.state }, this.onChangeRule)}</div>;
  }
}

storiesOf("Bounce Rule Detailed Page", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule, changelog }) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          changelog={changelog}
          filteredChangelog={changelog}
        />
      )}
    />
  ))
  .add("Empty Changelog", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          changelog={[]}
          filteredChangelog={[]}
        />
      )}
    />
  ))
  .add("Edit Mode", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }, onChangeRule) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          isEditClicked
          onChangeRule={onChangeRule}
          changelog={[]}
          filteredChangelog={[]}
        />
      )}
    />
  ))
  .add("Confirm Changes", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }, onChangeRule) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          isConfirmOpen
          onChangeRule={onChangeRule}
          changelog={[]}
          filteredChangelog={[]}
        />
      )}
    />
  ))
  .add("Cancel Changes", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }, onChangeRule) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          isCancelConfirmOpen
          onChangeRule={onChangeRule}
          changelog={[]}
          filteredChangelog={[]}
        />
      )}
    />
  ))
  .add("Viewing Change Details", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }) => (
        <BounceRuleDetailed
          currentRule={currentRule}
          updatedRule={updatedRule}
          selectedChange={sampleChangelog}
          changelog={[sampleChangelog]}
          filteredChangelog={[]}
          isChangeModalOpen
        />
      )}
    />
  ));

storiesOf("Bounce Rule Details", module)
  .addDecorator(StoryRouter())
  .add("Default", () => <DetailsContainer currentRule={sampleRule} />)
  .add("Editable", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule, changelog }, onChangeRule) => (
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
    <DetailsPageContainer
      render={({ changelog }) => <Changelog changelog={changelog} />}
    />
  ))
  .add("Empty", () => <Changelog changelog={[]} isChangelogEmpty />);

storiesOf("Modals", module)
  .add("Change Log Modal", () => (
    <DetailsPageContainer
      render={({ currentRule, updatedRule }) => (
        <ChangeModal
          currentRule={currentRule}
          changelog={[sampleChangelog]}
          selectedChange={updatedRule}
          handleModalClose={action("Modal")}
        />
      )}
    />
  ))
  .add("Confirmation Modal", () => (
    <DetailsPageContainer
      render={({ updatedRule }) => (
        <ConfirmationModal updatedRule={updatedRule} />
      )}
    />
  ))
  .add("Cancellation Modal", () => (
    <CancelConfirmationModal
      currentRule={sampleRule}
      handleModalClose={action("close modal")}
      handleModalConfirm={action("open modal")}
    />
  ));
