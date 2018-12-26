import React from "react";
import Button from "@sendgrid/ui-components/button";
import CenterModal from "@sendgrid/ui-components/center-modal";
import { Column } from "../../Column";
import { Row } from "../../Row";
import "../index.scss";
import { WriteSelectors } from "../selectors";

const DeleteAlertBody = () => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>There was an error deleting this rule.</h2>
          <p>
            {
              "The rule may have already been removed. If the problem persists, please try again later."
            }
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

const ConfirmModalBody = ({ handleModalClose, handleDeleteConfirm }) => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>Are you sure you&apos;d like to delete this rule?</h2>
          <p>
            {
              "Doing so will effect how current email will be handled via this bounce rule. This action will go into effect immediately."
            }
          </p>
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
          {"Close"}
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          {...WriteSelectors.deleteConfirmationConfirm}
          className="sg-button"
          onClick={handleDeleteConfirm}
          type="primary"
        >
          {"Confirm"}
        </Button>
      </Column>
    </Row>
  </div>
);

const DeleteConfirmationModal = ({
  handleModalClose,
  handleDeleteConfirm,
  idToDelete,
}) => (
  <CenterModal
    {...WriteSelectors.deleteConfirmation}
    open
    className="delete-confirm-modal"
    renderBody={(
      <ConfirmModalBody
        handleModalClose={handleModalClose}
        handleDeleteConfirm={handleDeleteConfirm}
        idToDelete={idToDelete}
      />
)}
  />
);

export { DeleteConfirmationAlert };
export default DeleteConfirmationModal;
