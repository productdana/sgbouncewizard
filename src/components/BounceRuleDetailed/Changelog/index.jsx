import React from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import mockChangelog from "../../../mocks/index";

const Changelog = ({ handleButtonClicked }) => (
  <div>
    <h2>Changelog</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>User</HeaderCell>
          <HeaderCell>Commit Message</HeaderCell>
          <HeaderCell className="actions-align">Actions</HeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockChangelog.map(change => (
          <ChangelogMin
            key={change.id}
            change={change}
            handleButtonClicked={handleButtonClicked}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

const ChangelogMin = ({ change, handleButtonClicked }) => {
  const { date, user, message } = change;
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{message}</TableCell>
      <TableCell className="changelog-view-icon-cell">
        <i
          onClick={handleButtonClicked}
          id="changeClicked"
          onKeyDown={handleButtonClicked}
          className="sg-icon sg-icon-view changelog-view-icon"
          role="button"
          tabIndex={0}
        />
      </TableCell>
    </TableRow>
  );
};

export default Changelog;
