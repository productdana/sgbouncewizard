import React from "react";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import "./index.scss";
import { shouldDisplay, displayUnixAsTime } from "../../../utils/utils";

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
      <TableCell>{shouldDisplay(displayUnixAsTime(createdAt))}</TableCell>
      <TableCell>{shouldDisplay(userId)}</TableCell>
      <TableCell className={operation.toLowerCase()}>
        {shouldDisplay(operation)}
      </TableCell>
      <TableCell>{shouldDisplay(comment)}</TableCell>
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
