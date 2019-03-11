import React from "react";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { shouldDisplay, displayUnixAsTime } from "../../../../utils/utils";
import { Column } from "../../../shared/Column";
import { Row } from "../../../shared/Row";
import "../../index.scss";

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
    operation,
  } = selectedChange;
  return (
    <Table className="change-table">
      <TableBody>
        <TableRow>
          <TableCell className="row-key">
            <strong>Change Comment</strong>
          </TableCell>
          <TableCell className="row-value">{shouldDisplay(comment)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Operation</strong>
          </TableCell>
          <TableCell>{shouldDisplay(operation)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>User</strong>
          </TableCell>
          <TableCell>{shouldDisplay(userId)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Time Created</strong>
          </TableCell>
          <TableCell>
            <TableCell>{shouldDisplay(displayUnixAsTime(createdAt))}</TableCell>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <strong>Bounce Action</strong>
          </TableCell>
          <TableCell>{shouldDisplay(bounceAction)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Response Code</strong>
          </TableCell>
          <TableCell>{shouldDisplay(responseCode)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Enhanced Code</strong>
          </TableCell>
          <TableCell>{shouldDisplay(enhancedCode)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>RegEx</strong>
          </TableCell>
          <TableCell>{shouldDisplay(regex)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Priority</strong>
          </TableCell>
          <TableCell>{shouldDisplay(priority)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Description</strong>
          </TableCell>
          <TableCell>{shouldDisplay(description)}</TableCell>
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
