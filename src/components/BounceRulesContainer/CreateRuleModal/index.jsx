import React from "react";
import { SideModal } from "@sendgrid/ui-components/side-modal";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Button } from "@sendgrid/ui-components/button";
import Alert from "@sendgrid/ui-components/alert";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const CreateRuleModal = ({
  handleCreateRuleUpdate,
  handleCreateRuleSubmit,
  newRule,
  isInvalidInput,
  handleCreateRuleClosed,
  handleAlertClose,
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
    <SideModal className="create-rule-modal" isOpen>
      <Row>
        <Column>
          <h1 className="h2.is-size-h1">Create a Bounce Rule</h1>
          {isInvalidInput && (
            <Alert type="danger" onClick={handleAlertClose}>
              One or more fields contain invalid characters.
            </Alert>
          )}
        </Column>
      </Row>
      <Row>
        <Column>
          <div className="rule-form-container">
            <form onSubmit={handleCreateRuleSubmit} id="create-rule-form">
              <div className="input-text-wrap">
                <label htmlFor="priority">
                  Priority
                  <TextInput
                    onChange={handleCreateRuleUpdate}
                    value={priority}
                    type="text"
                    id="priority"
                    isRequired
                  />
                </label>
                <label htmlFor="bounce_action">
                  Bounce Action
                  <TextInput
                    onChange={handleCreateRuleUpdate}
                    value={bounceAction}
                    type="text"
                    id="bounce_action"
                    isRequired
                  />
                </label>
                <label htmlFor="response_code">
                  Response Code
                  <TextInput
                    onChange={handleCreateRuleUpdate}
                    value={responseCode}
                    type="text"
                    id="response_code"
                    isRequired
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <TextInput
                    onChange={handleCreateRuleUpdate}
                    value={description}
                    type="text"
                    id="description"
                    isRequired
                  />
                </label>
                <label htmlFor="enhanced_code">
                  Enhanced Code
                  <TextInput
                    onChange={handleCreateRuleUpdate}
                    value={enhancedCode}
                    type="text"
                    id="enhanced_code"
                    isRequired
                  />
                </label>
                <label htmlFor="regex">
                  Regular Expression
                  <TextInput
                    onChange={handleCreateRuleUpdate}
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
            type="secondary"
            className="sg-button sg-right"
            onClick={handleCreateRuleClosed}
            onKeyDown={handleCreateRuleClosed}
            id="create-rule-close"
          >
            Cancel
          </Button>
          <Button
            className="sg-button"
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

export default CreateRuleModal;
