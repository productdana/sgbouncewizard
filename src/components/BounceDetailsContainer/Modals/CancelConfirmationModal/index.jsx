import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { Column } from "../../../shared/Column";
import { Row } from "../../../shared/Row";
import { WriteSelectors } from "../../selectors";

const ConfirmModalBody = ({ handleModalClose, handleCancelConfirmation }) => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>Are you sure you want to discard these changes?</h2>
          <p>Doing so will remove applied changes.</p>
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={1} offset={10}>
        <Button
          className="sg-button"
          onClick={handleModalClose}
          id="isCancelConfirmOpen"
          type="secondary"
        >
          Close
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          className="sg-button"
          onClick={handleCancelConfirmation}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const CancelConfirmModal = ({
  currentRule,
  handleModalClose,
  handleCancelConfirmation,
}) => (
  <CenterModal
    {...WriteSelectors.cancelConfirmationModal}
    open
    renderBody={(
      <ConfirmModalBody
        handleModalClose={handleModalClose}
        currentRule={currentRule}
        handleCancelConfirmation={handleCancelConfirmation}
      />
)}
  />
);

export default CancelConfirmModal;
