import React from "react";
import { CenterModal } from "@sendgrid/ui-components/center-modal";
import { Button } from "@sendgrid/ui-components/button";
import { Row } from "../../Row";
import { Column } from "../../Column";
import { WriteSelectors } from "../selectors";

const ConfirmationHeader = () => (
  <div>
    <h2>Are you sure you&apos;d like to create this rule?</h2>
  </div>
);

const ConfirmationBody = () => (
  <div {...WriteSelectors.confirmModal}>
    <p>Please review the bounce rule before submitting.</p>
  </div>
);

const ConfirmationFooter = ({
  handleCreateRuleClosed,
  handleCreateConfirm,
}) => (
  <div>
    <Row>
      <Column width={1} offset={10}>
        <Button
          className="sg-button"
          onClick={handleCreateRuleClosed}
          id="create-rule-confirmation-close"
          type="secondary"
        >
          {"Close"}
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          className="sg-button"
          {...WriteSelectors.confirmationSubmit}
          onClick={handleCreateConfirm}
          type="primary"
        >
          {"Confirm"}
        </Button>
      </Column>
    </Row>
  </div>
);

const CreateRuleConfirmationModal = ({
  handleCreateRuleClosed,
  handleCreateConfirm,
}) => (
  <CenterModal
    open
    renderBody={<ConfirmationBody />}
    renderHeader={<ConfirmationHeader />}
    renderFooter={(
      <ConfirmationFooter
        handleCreateRuleClosed={handleCreateRuleClosed}
        handleCreateConfirm={handleCreateConfirm}
      />
)}
  />
);

export default CreateRuleConfirmationModal;
