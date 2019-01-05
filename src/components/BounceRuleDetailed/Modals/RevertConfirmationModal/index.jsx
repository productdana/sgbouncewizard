import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Column } from "../../../Column";
import { Row } from "../../../Row";

const ConfirmRevertBody = ({
  handleModalClose,
  handleRevertConfirm,
  onChangeRuleRevert,
  selectedChange,
}) => {
  const { comment } = selectedChange;
  return (
    <div>
      <Row>
        <Column>
          <div>
            <h2>Are you sure you&apos;d like revert to this change?</h2>
            <p>
              Doing so will effect how current email will be handled via this
              bounce rule. This action will go into effect immediately.
            </p>
          </div>
          <TextInput
            onChange={onChangeRuleRevert}
            value={comment}
            id="comment"
            type="text"
            label="Commit Message"
          />
        </Column>
      </Row>
      <Row>
        <Column width={1} offset={10}>
          <Button
            className="sg-button"
            onClick={handleModalClose}
            id="isRevertConfirmOpen"
            type="secondary"
          >
            Close
          </Button>
        </Column>
        <Column width={1} offset={11}>
          <Button
            className="sg-button"
            onClick={handleRevertConfirm}
            type="primary"
          >
            Confirm
          </Button>
        </Column>
      </Row>
    </div>
  );
};

const RevertConfirmationModal = ({
  handleModalClose,
  handleRevertConfirm,
  selectedChange,
  onChangeRuleRevert,
}) => (
  <CenterModal
    open
    renderBody={(
      <ConfirmRevertBody
        handleModalClose={handleModalClose}
        handleRevertConfirm={handleRevertConfirm}
        onChangeRuleRevert={onChangeRuleRevert}
        selectedChange={selectedChange}
      />
)}
  />
);

export default RevertConfirmationModal;
