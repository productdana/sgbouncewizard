import React from "react";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import CenterModal from "@sendgrid/ui-components/center-modal";
import { Column } from "../../../Column";
import { Row } from "../../../Row";
import "./index.scss";
import { WriteSelectors } from "../../selectors";

const isSubmitDisabled = (isCommitValid, comment) =>
  !isCommitValid || comment === undefined || comment === "";

const DeleteAlertBody = () => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>There was an error deleting this rule.</h2>
          <p>
            The rule may have already been removed. If the problem persists,
            please try again later.
          </p>
        </div>
      </Column>
    </Row>
  </div>
);

const DeleteConfirmationAlert = ({ handleModalClose }) => (
  <CenterModal
    {...WriteSelectors.deleteAlert}
    open
    hasX
    renderBody={<DeleteAlertBody />}
    id="isDeleteAlertOpen"
    onClose={handleModalClose}
  />
);

const ConfirmModalBody = ({
  selectedRule,
  handleModalClose,
  handleDeleteConfirm,
  handleDeleteCommit,
  isCommitValid,
}) => {
  const { comment } = selectedRule;
  return (
    <div>
      <Row>
        <Column>
          <div>
            <h2>Are you sure you&apos;d like to delete this rule?</h2>
            <p>
              Doing so will effect how current email will be handled via this
              bounce rule. This action will go into effect immediately.
            </p>
            <p>Please enter a commit message and confirm your changes.</p>
            <TextInput
              {...WriteSelectors.commitMessage}
              onChange={handleDeleteCommit}
              value={comment}
              isRequired
              isValid={isCommitValid}
              info={!isCommitValid && "This field is required."}
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
            id="isDeleteConfirmationOpen"
            type="secondary"
          >
            Close
          </Button>
        </Column>
        <Column width={1} offset={11}>
          <Button
            {...WriteSelectors.deleteConfirmationConfirm}
            className="sg-button"
            onClick={handleDeleteConfirm}
            disabled={isSubmitDisabled(isCommitValid, comment)}
            type="primary"
          >
            Confirm
          </Button>
        </Column>
      </Row>
    </div>
  );
};

const DeleteConfirmationModal = ({
  selectedRule,
  handleModalClose,
  handleDeleteConfirm,
  idToDelete,
  handleDeleteCommit,
  isCommitValid,
}) => (
  <CenterModal
    open
    className="delete-confirm-modal"
    renderBody={(
      <ConfirmModalBody
        selectedRule={selectedRule}
        isCommitValid={isCommitValid}
        handleModalClose={handleModalClose}
        handleDeleteConfirm={handleDeleteConfirm}
        idToDelete={idToDelete}
        handleDeleteCommit={handleDeleteCommit}
      />
)}
  />
);

export { DeleteConfirmationAlert };
export default DeleteConfirmationModal;
