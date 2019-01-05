import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Column } from "../../../Column";
import { Row } from "../../../Row";
import { WriteSelectors } from "../../selectors";

const ChangeModalBody = ({ currentRule, handleModalClose, selectedChange }) => (
  <div className="changelog-modal">
    <Row>
      <Column width={6} offset={1}>
        <h1>Previous</h1>
        <ChangeTable currentRule={selectedChange} />
      </Column>
      <Column width={6} offset={7}>
        <h1>Current</h1>
        <div>
          <ChangeTable currentRule={currentRule} />
        </div>
      </Column>
    </Row>

    <Row>
      <Column className="changelog-modal-button" width={2} offset={11}>
        <Button id="isChangeModalOpen" onClick={handleModalClose}>
          Close
        </Button>
      </Column>
    </Row>
  </div>
);

const ChangeTable = ({ currentRule }) => {
  const {
    description,
    response_code: responseCode,
    enhanced_code: enhancedCode,
    bounce_action: bounceAction,
    regex,
    priority,
    comment,
    user_id: userId,
    created_at: createdAt,
  } = currentRule;
  return (
    <Table className="change-table">
      <TableBody>
        <TableRow>
          <TableCell>
            <strong>Change Comment</strong>
          </TableCell>
          <TableCell>{comment}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>User</strong>
          </TableCell>
          <TableCell>{userId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Time Created</strong>
          </TableCell>
          <TableCell>{createdAt}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <strong>Bounce Action</strong>
          </TableCell>
          <TableCell>{bounceAction}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Response Code</strong>
          </TableCell>
          <TableCell>{responseCode}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Enhanced Code</strong>
          </TableCell>
          <TableCell>{enhancedCode}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>RegEx</strong>
          </TableCell>
          <TableCell>{regex}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Priority</strong>
          </TableCell>
          <TableCell>{priority}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Description</strong>
          </TableCell>
          <TableCell>{description}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const ChangeModal = ({ currentRule, handleModalClose, selectedChange }) => (
  <CenterModal
    {...WriteSelectors.changelogModal}
    large
    open
    renderBody={(
      <ChangeModalBody
        handleModalClose={handleModalClose}
        selectedChange={selectedChange}
        currentRule={currentRule}
      />
)}
  />
);

export default ChangeModal;
