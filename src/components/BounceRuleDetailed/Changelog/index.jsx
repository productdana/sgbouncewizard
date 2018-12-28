import React from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import Card from "@sendgrid/ui-components/card";
import { Row } from "../../Row";

const EmptyChangelog = () => (
  <Row>
    <Card
      icon="airplane"
      iconSize={40}
      title="Large &amp; In-Charge"
      body="The easiest way to send email. It only requires modifying your application’s SMTP configuration."
      centered
    >
      No rules are available for display
    </Card>
  </Row>
);

const Changelog = ({ handleButtonClicked, changelog, isChangelogEmpty }) => (
  <div>
    <h2>Changelog</h2>
    {isChangelogEmpty && <EmptyChangelog />}
    {!isChangelogEmpty && (
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
          {changelog.map(change => (
            <ChangelogMin
              key={change.createdat}
              change={change}
              handleButtonClicked={handleButtonClicked}
            />
          ))}
        </TableBody>
      </Table>
    )}
  </div>
);

const ChangelogMin = ({ change, handleButtonClicked }) => {
  const { createdat, user_id: userId, comment } = change;
  return (
    <TableRow>
      <TableCell>{createdat}</TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{comment}</TableCell>
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
