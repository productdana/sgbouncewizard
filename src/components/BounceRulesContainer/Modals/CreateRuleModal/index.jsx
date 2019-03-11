import React from "react";
import PropTypes from "prop-types";
import { SideModal } from "@sendgrid/ui-components/side-modal";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Select } from "@sendgrid/ui-components/select";
import { Button } from "@sendgrid/ui-components/button";
import { Row } from "../../../shared/Row";
import { Column } from "../../../shared/Column";
import "./index.scss";
import { WriteSelectors } from "../../selectors";

const CreateRuleModal = ({
  handleRuleUpdate,
  handleCreateSubmit,
  handleDropdownSelect,
  newRule,
  handleModalClose,
  handleRuleUpdateInt,
  fieldValidation,
}) => {
  const {
    priority,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
    enhanced_code: enhancedCode,
    regex,
  } = newRule;
  const {
    description: descriptionError,
    response_code: responseError,
    enhanced_code: enhancedError,
    priority: priorityError,
    bounce_action: bounceError,
    regex: regexError,
  } = fieldValidation;
  return (
    <SideModal
      {...WriteSelectors.createRuleModal}
      className="create-rule-modal"
      isOpen
    >
      <Row>
        <Column>
          <h1 className="h2.is-size-h1">Create a Bounce Rule</h1>
        </Column>
      </Row>
      <Row>
        <Column>
          <div className="rule-form-container">
            <form onSubmit={handleCreateSubmit} id="create-rule-form">
              <div className="input-text-wrap">
                <label htmlFor="bounce_action">
                  Bounce Action
                  <div {...WriteSelectors.bounceAction}>
                    <Select
                      value={{ label: bounceAction, value: bounceAction }}
                      options={[
                        { label: "no_action", value: "no_action" },
                        { label: "retry", value: "retry" },
                        { label: "suppress", value: "suppress" },
                        { label: "retry", value: "retry" },
                        { label: "blocked", value: "blocked" },
                      ]}
                      onChange={handleDropdownSelect}
                      id="bounce_action"
                      isValid={!bounceError}
                      info={bounceError}
                    />
                  </div>
                </label>
                <label htmlFor="priority">
                  Priority
                  <TextInput
                    onChange={handleRuleUpdateInt}
                    {...WriteSelectors.priority}
                    value={priority}
                    type="number"
                    id="priority"
                    isRequired
                    isValid={!priorityError}
                    info={priorityError}
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
                    isValid={!responseError}
                    info={responseError}
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
                    isValid={!descriptionError}
                    info={descriptionError}
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
                    isValid={!enhancedError}
                    info={enhancedError}
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
                    isValid={!regexError}
                    info={regexError}
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
  handleModalClose: PropTypes.func,
  handleInvalidAlertClose: PropTypes.func,
};

CreateRuleModal.defaultProps = {
  handleRuleUpdate: () => {},
  handleCreateSubmit: () => {},
  handleModalClose: () => {},
  handleInvalidAlertClose: () => {},
};

export default CreateRuleModal;
