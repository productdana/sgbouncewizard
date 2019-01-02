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

const ChangeModalBody = ({ currentRule, handleModalClose }) => (
  <div className="changelog-modal">
    <Row>
      <Column width={6} offset={1}>
        <h1>Current</h1>
        <ChangeTable currentRule={currentRule} />
      </Column>
      <Column width={6} offset={7}>
        <h1>Previous</h1>
        <ChangeTable currentRule={currentRule} />
      </Column>
    </Row>
    <Row>
      <Column className="changelog-modal-button sg-right" width={1} offset={12}>
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
    id,
    response_code: responseCode,
    enhanced_code: enhancedCode,
    bounce_action: bounceAction,
    regex,
    priority,
  } = currentRule;
  return (
    <Table className="change-table">
      <TableBody>
        <TableRow>
          <TableCell>
            <strong>ID</strong>
          </TableCell>
          <TableCell>{id}</TableCell>
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

const ChangeModal = ({ currentRule, handleModalClose }) => (
  <CenterModal
    large
    open
    renderBody={(
      <ChangeModalBody
        handleModalClose={handleModalClose}
        currentRule={currentRule}
      />
)}
  />
);

export default ChangeModal;
