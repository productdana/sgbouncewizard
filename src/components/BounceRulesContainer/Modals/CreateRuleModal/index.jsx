import React from "react";
import { SideModal } from "@sendgrid/ui-components/side-modal";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { CenterModal } from "@sendgrid/ui-components/center-modal";
import { Button } from "@sendgrid/ui-components/button";
import Alert from "@sendgrid/ui-components/alert";
import PropTypes from "prop-types";
import { Row } from "../../../Row";
import { Column } from "../../../Column";
import "../../index.scss";
import { WriteSelectors } from "../../selectors";

const ConfirmationHeader = () => (
  <div>
    <h2>Are you sure you&apos;d like to create this rule?</h2>
  </div>
);

const ConfirmationBody = ({ newRule, handleRuleUpdate }) => {
  const { comment } = newRule;
  return (
    <div {...WriteSelectors.confirmModal}>
      <p>Please enter a commit message and confirm your changes.</p>
      <TextInput
        {...WriteSelectors.commitMessage}
        onChange={handleRuleUpdate}
        value={comment}
        id="comment"
        type="text"
        label="Commit Message"
      />
    </div>
  );
};

const ConfirmationFooter = ({ handleModalClose, handleCreateConfirm }) => (
  <div>
    <Row>
      <Column width={1} offset={10}>
        <Button
          {...WriteSelectors.cancelConfirmationSubmit}
          className="sg-button"
          onClick={handleModalClose}
          id="isCreateRuleConfirmationOpen"
          type="secondary"
        >
          Close
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          className="sg-button"
          {...WriteSelectors.confirmationSubmit}
          onClick={handleCreateConfirm}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const CreateConfirmationModal = ({
  newRule,
  handleModalClose,
  handleCreateConfirm,
  handleRuleUpdate,
}) => (
  <CenterModal
    {...WriteSelectors.confirmModal}
    open
    renderBody={
      <ConfirmationBody newRule={newRule} handleRuleUpdate={handleRuleUpdate} />
    }
    renderHeader={<ConfirmationHeader />}
    renderFooter={(
      <ConfirmationFooter
        handleModalClose={handleModalClose}
        handleCreateConfirm={handleCreateConfirm}
        handleRuleUpdate={handleRuleUpdate}
      />
)}
  />
);

const CreateRuleModal = ({
  handleRuleUpdate,
  handleCreateSubmit,
  newRule,
  isInvalidInput,
  handleModalClose,
  handleRuleUpdateInt,
}) => {
  const {
    priority,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
    enhanced_code: enhancedCode,
    regex,
  } = newRule;
  return (
    <SideModal
      {...WriteSelectors.createRuleModal}
      className="create-rule-modal"
      isOpen
    >
      <Row>
        <Column>
          <h1 className="h2.is-size-h1">Create a Bounce Rule</h1>
          {isInvalidInput && (
            <Alert type="danger" onClick={handleModalClose} id="isInvalidInput">
              One or more fields contain invalid characters.
            </Alert>
          )}
        </Column>
      </Row>
      <Row>
        <Column>
          <div className="rule-form-container">
            <form onSubmit={handleCreateSubmit} id="create-rule-form">
              <div className="input-text-wrap">
                <label htmlFor="priority">
                  Priority
                  <TextInput
                    onChange={handleRuleUpdateInt}
                    {...WriteSelectors.priority}
                    value={priority}
                    type="number"
                    id="priority"
                    isRequired
                  />
                </label>
                <label htmlFor="bounce_action">
                  Bounce Action
                  <TextInput
                    onChange={handleRuleUpdate}
                    {...WriteSelectors.bounceAction}
                    value={bounceAction}
                    type="text"
                    id="bounce_action"
                    isRequired
                  />
                </label>
                <label htmlFor="response_code">
                  Response Code
                  <TextInput
                    onChange={handleRuleUpdateInt}
                    {...WriteSelectors.responseCode}
                    value={responseCode}
                    type="number"
                    id="response_code"
                    isRequired
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <TextInput
                    onChange={handleRuleUpdate}
                    {...WriteSelectors.description}
                    value={description}
                    type="text"
                    id="description"
                    isRequired
                  />
                </label>
                <label htmlFor="enhanced_code">
                  Enhanced Code
                  <TextInput
                    onChange={handleRuleUpdate}
                    {...WriteSelectors.enhancedCode}
                    value={enhancedCode}
                    type="text"
                    id="enhanced_code"
                    isRequired
                  />
                </label>
                <label htmlFor="regex">
                  Regular Expression
                  <TextInput
                    onChange={handleRuleUpdate}
                    {...WriteSelectors.regex}
                    value={regex}
                    type="text"
                    id="regex"
                    isRequired
                  />
                </label>
              </div>
            </form>
          </div>
        </Column>
      </Row>
      <Row className="create-modal-button-row">
        <Column width={7} offset={7}>
          <Button
            {...WriteSelectors.cancelCreateRuleButton}
            className="sg-button sg-right"
            onClick={handleModalClose}
            onKeyDown={handleModalClose}
            id="isCreateRuleOpen"
            type="secondary"
          >
            Cancel
          </Button>
          <Button
            className="sg-button"
            {...WriteSelectors.submitButton}
            form="create-rule-form"
            type="primary"
            isSubmit
          >
            Submit
          </Button>
        </Column>
      </Row>
    </SideModal>
  );
};

CreateRuleModal.propTypes = {
  handleRuleUpdate: PropTypes.func,
  handleCreateSubmit: PropTypes.func,
  isInvalidInput: PropTypes.bool,
  handleModalClose: PropTypes.func,
  handleAlertClose: PropTypes.func,
};

CreateRuleModal.defaultProps = {
  handleRuleUpdate: () => {},
  handleCreateSubmit: () => {},
  isInvalidInput: false,
  handleModalClose: () => {},
  handleAlertClose: () => {},
};

export { CreateConfirmationModal };
export default CreateRuleModal;
