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
import "./index.scss";

function getDifferences(currentRule, selectedChange) {
  const differences = Object.keys(currentRule).filter(
    k => currentRule[k] !== selectedChange[k]
  );
  return differences;
}

function displayChange(isCurrentChange, differences, keyToCheck) {
  if (differences.includes(keyToCheck)) {
    if (isCurrentChange) {
      return "hasChangedCurrent";
    }
    return "hasChangedPrevious";
  }
  return "";
}

const ChangeModalBody = ({
  changelog,
  handleModalClose,
  selectedChange,
  differences,
  handleRevertClicked,
}) => (
  <div className="changelog-modal">
    <Row>
      <Column width={6} offset={1}>
        <h1>Previous</h1>
        <ChangeTable
          isCurrentChange={false}
          currentRule={selectedChange}
          differences={differences}
        />
      </Column>
      <Column width={6} offset={7}>
        <h1>Current</h1>
        <div>
          <ChangeTable
            isCurrentChange
            currentRule={changelog[0]}
            differences={differences}
          />
        </div>
      </Column>
    </Row>

    <Row>
      <Column className="changelog-modal-button" width={3} offset={10}>
        <Button
          id="isChangeModalOpen"
          className="sm-sg-button"
          type="secondary"
          onClick={handleModalClose}
        >
          Close
        </Button>
        <Button
          id="isChangeModalOpen"
          className="sm-sg-button"
          onClick={handleRevertClicked}
        >
          Revert
        </Button>
      </Column>
    </Row>
  </div>
);

const ChangeTable = ({ currentRule, differences, isCurrentChange }) => {
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
          <TableCell
            className={displayChange(isCurrentChange, differences, "comment")}
          >
            {comment}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>User</strong>
          </TableCell>
          <TableCell
            className={displayChange(isCurrentChange, differences, "user_id")}
          >
            {userId}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Time Created</strong>
          </TableCell>
          <TableCell
            className={displayChange(
              isCurrentChange,
              differences,
              "created_at"
            )}
          >
            {createdAt}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <strong>Bounce Action</strong>
          </TableCell>
          <TableCell
            className={displayChange(
              isCurrentChange,
              differences,
              "bounce_action"
            )}
          >
            {bounceAction}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Response Code</strong>
          </TableCell>
          <TableCell
            className={displayChange(
              isCurrentChange,
              differences,
              "response_code"
            )}
          >
            {responseCode}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Enhanced Code</strong>
          </TableCell>
          <TableCell
            className={displayChange(
              isCurrentChange,
              differences,
              "enhanced_code"
            )}
          >
            {enhancedCode}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>RegEx</strong>
          </TableCell>
          <TableCell
            className={displayChange(isCurrentChange, differences, "regex")}
          >
            {regex}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Priority</strong>
          </TableCell>
          <TableCell
            className={displayChange(isCurrentChange, differences, "priority")}
          >
            {priority}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Description</strong>
          </TableCell>
          <TableCell
            className={displayChange(
              isCurrentChange,
              differences,
              "description"
            )}
          >
            {description}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const ChangeModal = ({
  changelog,
  handleModalClose,
  selectedChange,
  handleRevertClicked,
}) => {
  const differences = getDifferences(changelog[0], selectedChange);
  return (
    <CenterModal
      {...WriteSelectors.changelogModal}
      large
      open
      renderBody={(
        <ChangeModalBody
          changelog={changelog}
          handleModalClose={handleModalClose}
          selectedChange={selectedChange}
          differences={differences}
          handleRevertClicked={handleRevertClicked}
        />
)}
    />
  );
};

export default ChangeModal;
