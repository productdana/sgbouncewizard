import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Column } from "../../../Column";
import { Row } from "../../../Row";
import { WriteSelectors } from "../../selectors";

const ConfirmModalBody = ({
  currentRule,
  handleModalClose,
  handleSaveConfirmation,
  onChangeRule,
}) => {
  const { comment } = currentRule;
  return (
    <div>
      <Row>
        <Column>
          <div>
            <h2>Please enter a commit message and confirm your changes.</h2>
            <p>
              Doing so will effect how current email will be handled via this
              bounce rule. This action will go into effect immediately.
            </p>
            <TextInput
              {...WriteSelectors.commitInput}
              onChange={onChangeRule}
              value={comment}
              id="comment"
              type="text"
              label="Commit Message"
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column width={1} offset={10}>
          <Button
            className="sg-button"
            onClick={handleModalClose}
            id="isConfirmOpen"
            type="secondary"
          >
            Close
          </Button>
        </Column>
        <Column width={1} offset={11}>
          <Button
            {...WriteSelectors.confirmSubmit}
            className="sg-button"
            onClick={handleSaveConfirmation}
            type="primary"
          >
            Confirm
          </Button>
        </Column>
      </Row>
    </div>
  );
};

const ConfirmationModal = ({
  currentRule,
  handleModalClose,
  handleSaveConfirmation,
  onChangeRule,
}) => (
  <CenterModal
    {...WriteSelectors.saveConfirmationModal}
    open
    renderBody={(
      <ConfirmModalBody
        currentRule={currentRule}
        handleModalClose={handleModalClose}
        handleSaveConfirmation={handleSaveConfirmation}
        onChangeRule={onChangeRule}
      />
)}
  />
);

export default ConfirmationModal;
