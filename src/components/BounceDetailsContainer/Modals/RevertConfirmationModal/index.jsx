import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Column } from "../../../shared/Column";
import { Row } from "../../../shared/Row";

const isSubmitDisabled = (isCommitValid, comment) =>
  !isCommitValid || comment === undefined || comment === "";

const ConfirmRevertBody = ({
  comment,
  handleRevertModalClose,
  handleRevertConfirm,
  onChangeRevert,
  isCommitValid,
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
          onChange={onChangeRevert}
          value={comment}
          isRequired
          isValid={isCommitValid}
          info={!isCommitValid && "This field is required."}
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
          onClick={handleRevertModalClose}
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
          disabled={isSubmitDisabled(isCommitValid, comment)}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const RevertConfirmationModal = ({
  handleRevertConfirm,
  selectedChange,
  onChangeRevert,
  handleRevertModalClose,
  isCommitValid,
}) => {
  const { comment } = selectedChange;
  return (
    <CenterModal
      open
      renderBody={(
        <ConfirmRevertBody
          comment={comment}
          handleRevertModalClose={handleRevertModalClose}
          handleRevertConfirm={handleRevertConfirm}
          selectedChange={selectedChange}
          onChangeRevert={onChangeRevert}
          isCommitValid={isCommitValid}
        />
)}
    />
  );
};

export default RevertConfirmationModal;
