import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Column } from "../../Column";
import { Row } from "../../Row";
import "./index.scss";

const ActivityModalBody = ({ handleModalClose, selectedChange }) => (
  <div className="changelog-modal">
    <Row>
      <Column>
        <h1>Rule Details</h1>
        <DetailsTable selectedChange={selectedChange} />
      </Column>
    </Row>
    <Row>
      <Column className="changelog-modal-button" width={2} offset={11}>
        <Button id="isActivityModalOpen" onClick={handleModalClose}>
          Close
        </Button>
      </Column>
    </Row>
  </div>
);

const DetailsTable = ({ selectedChange }) => {
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
  } = selectedChange;
  return (
    <Table className="change-table">
      <TableBody>
        <TableRow>
          <TableCell className="row-key">
            <strong>Change Comment</strong>
          </TableCell>
          <TableCell className="row-value">{comment || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>User</strong>
          </TableCell>
          <TableCell>{userId || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Time Created</strong>
          </TableCell>
          <TableCell>{createdAt || "N/A"}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <strong>Bounce Action</strong>
          </TableCell>
          <TableCell>{bounceAction || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Response Code</strong>
          </TableCell>
          <TableCell>{responseCode || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Enhanced Code</strong>
          </TableCell>
          <TableCell>{enhancedCode || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>RegEx</strong>
          </TableCell>
          <TableCell>{regex || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Priority</strong>
          </TableCell>
          <TableCell>{priority || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Description</strong>
          </TableCell>
          <TableCell>{description || "N/A"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const ActivityDetailsModal = ({ handleModalClose, selectedChange }) => (
  <CenterModal
    large
    open
    renderBody={(
      <ActivityModalBody
        handleModalClose={handleModalClose}
        selectedChange={selectedChange}
      />
)}
  />
);

export default ActivityDetailsModal;
