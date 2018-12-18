import React from "react";
import { SideModal } from "@sendgrid/ui-components/side-modal";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Button } from "@sendgrid/ui-components/button";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const CreateRuleModal = ({
  handleCreateRuleUpdate,
  handleCreateRuleSubmit,
  newRule,
  handleCreateRuleClosed,
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
    <SideModal isOpen>
      <div className="create-rule-modal">
        <Row>
          <Column>
            <h1 className="h2.is-size-h1">Create a Bounce Rule</h1>
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
        <Row>
          <Column width={2} offset={8}>
            <Button
              type="secondary"
              className="sg-button"
              onClick={handleCreateRuleClosed}
              onKeyDown={handleCreateRuleClosed}
              id="create-rule-close"
            >
              Cancel
            </Button>
          </Column>
          <Column width={2} offset={11}>
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
      </div>
    </SideModal>
  );
};

export default CreateRuleModal;
