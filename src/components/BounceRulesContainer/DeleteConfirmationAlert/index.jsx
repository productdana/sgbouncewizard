import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import { Column } from "../../Column";
import { Row } from "../../Row";
import { WriteSelectors } from "../selectors";

const ConfirmModalBody = () => (
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
    renderBody={<ConfirmModalBody />}
    onClose={handleModalClose}
  />
);

export default DeleteConfirmationAlert;
