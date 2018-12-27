import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { Column } from "../../../Column";
import { Row } from "../../../Row";

const ConfirmModalBody = ({
  handleModalClose,
  handleModalConfirm,
  modalType,
}) => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>Are you sure you&apos;d like to commit these changes?</h2>
          <p>
            Doing so will effect how current email will be handled via this
            bounce rule. This action will go into effect immediately.
          </p>
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={1} offset={10}>
        <Button
          className="sg-button"
          onClick={handleModalClose}
          id={modalType}
          type="secondary"
        >
          Close
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          className="sg-button"
          id={modalType}
          onClick={handleModalConfirm}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const ConfirmationModal = ({ handleModalClose, handleModalConfirm }) => (
  <CenterModal
    open
    renderBody={(
      <ConfirmModalBody
        handleModalClose={handleModalClose}
        handleModalConfirm={handleModalConfirm}
        modalType="saveModal"
      />
)}
  />
);

export default ConfirmationModal;
