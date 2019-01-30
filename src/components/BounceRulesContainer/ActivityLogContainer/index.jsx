import React from "react";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import moment from "moment";
import "./index.scss";

const ActivityLogContainer = ({ activityLog, handleActivityClicked }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell className="row-date">Date</HeaderCell>
        <HeaderCell className="row-user">User</HeaderCell>
        <HeaderCell className="row-activity">Activity</HeaderCell>
        <HeaderCell className="row-message">Commit Message</HeaderCell>
        <HeaderCell className="actions-cell row-action">Actions</HeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {activityLog.map((log, index) => (
        <BounceRuleMin
          handleActivityClicked={handleActivityClicked}
          key={log.created_at}
          log={log}
          index={index}
        />
      ))}
    </TableBody>
  </Table>
);

const BounceRuleMin = ({ log, index, handleActivityClicked }) => {
  const {
    id,
    created_at: createdAt,
    user_id: userId,
    operation,
    comment,
  } = log;
  return (
    <TableRow>
      <TableCell>
        {moment.unix(createdAt).format("MM/DD/YYYY LTS") || "N/A"}
      </TableCell>
      <TableCell>{userId || "N/A"}</TableCell>
      <TableCell className={operation.toLowerCase()}>
        {operation || "N/A"}
      </TableCell>
      <TableCell>{comment || "N/A"}</TableCell>
      <TableCell className="changelog-view-icon-cell">
        <i
          onClick={handleActivityClicked}
          onKeyDown={handleActivityClicked}
          className="sg-icon sg-icon-view changelog-view-icon"
          id="isActivityModalOpen"
          rule-id={id}
          role="button"
          index={index}
          tabIndex={0}
        />
      </TableCell>
    </TableRow>
  );
};

export default ActivityLogContainer;
