import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Column } from "../../../Column";
import { Row } from "../../../Row";
import { WriteSelectors } from "../../selectors";

const UpdateAlertError = ({ handleModalClose }) => (
  <div {...WriteSelectors.networkErrorAlert} className="alert alert-danger">
    <p>
      <i className="sg-icon sg-icon-warning" />
      We are unable to update the bounce rule due to some issues with the
      network.
      <i
        onClick={handleModalClose}
        onKeyDown={handleModalClose}
        id="isUpdateError"
        className="sg-icon sg-icon-x"
        role="button"
        tabIndex={0}
      />
    </p>
  </div>
);

const ConfirmModalBody = ({
  updatedRule,
  handleModalClose,
  handleSaveConfirmation,
  onChangeRule,
  isUpdateError,
  isCommitEmpty,
}) => {
  const { comment } = updatedRule;
  return (
    <div>
      <Row>
        <Column>
          <div>
            <h2>Please enter a commit message and confirm your changes.</h2>
            {isUpdateError && (
              <UpdateAlertError handleModalClose={handleModalClose} />
            )}
            <p>
              Doing so will affect how current email will be handled via this
              bounce rule. This action will go into effect immediately.
            </p>
            <TextInput
              {...WriteSelectors.commitInput}
              onChange={onChangeRule}
              value={comment}
              isRequired
              isValid={!isCommitEmpty}
              info={isCommitEmpty && "This field is required."}
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
            disabled={isCommitEmpty}
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
  updatedRule,
  handleModalClose,
  handleSaveConfirmation,
  onChangeRule,
  isUpdateError,
}) => {
  const { comment } = updatedRule;
  const isCommitEmpty = comment === undefined || comment.length <= 0;
  return (
    <CenterModal
      {...WriteSelectors.saveConfirmationModal}
      open
      renderBody={(
        <ConfirmModalBody
          isCommitEmpty={isCommitEmpty}
          updatedRule={updatedRule}
          handleModalClose={handleModalClose}
          handleSaveConfirmation={handleSaveConfirmation}
          onChangeRule={onChangeRule}
          isUpdateError={isUpdateError}
        />
)}
    />
  );
};

export default ConfirmationModal;
