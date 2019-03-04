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
  newCommitMessage,
  isCommitEmpty,
  isCommitDisabled,
}) => (
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
          value={newCommitMessage}
          isRequired
          isValid={!isCommitEmpty}
          info={isCommitEmpty && "This field is required."}
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
          disabled={isCommitDisabled}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const RevertConfirmationModal = ({
  handleModalClose,
  handleRevertConfirm,
  selectedChange,
  onChangeRuleRevert,
  newCommitMessage,
  isCommitEmpty,
  isCommitDisabled,
}) => (
  <CenterModal
    open
    renderBody={(
      <ConfirmRevertBody
        handleModalClose={handleModalClose}
        handleRevertConfirm={handleRevertConfirm}
        onChangeRuleRevert={onChangeRuleRevert}
        selectedChange={selectedChange}
        newCommitMessage={newCommitMessage}
        isCommitEmpty={isCommitEmpty}
        isCommitDisabled={isCommitDisabled}
      />
)}
  />
  );

export default RevertConfirmationModal;
