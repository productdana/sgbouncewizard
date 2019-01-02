import React from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import Moment from "react-moment";

import Card from "@sendgrid/ui-components/card";
import { Row } from "../../Row";

const EmptyChangelog = () => (
  <Row>
    <Card
      icon="airplane"
      iconSize={40}
      title="No Previous Changes Found!"
      body="No changes have been previously made to this bounce rule."
      centered
    />
  </Row>
);

const Changelog = ({ handleChangelogClicked, changelog, isChangelogEmpty }) => (
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
              handleChangelogClicked={handleChangelogClicked}
            />
          ))}
        </TableBody>
      </Table>
    )}
  </div>
);

const ChangelogMin = ({ change, handleChangelogClicked }) => {
  const { createdat, user_id: userId, comment } = change;

  return (
    <TableRow>
      <TableCell>
        <Moment unix>{createdat}</Moment>
      </TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell className="changelog-view-icon-cell">
        <i
          onClick={handleChangelogClicked}
          id="changeClicked"
          onKeyDown={handleChangelogClicked}
          className="sg-icon sg-icon-view changelog-view-icon"
          role="button"
          tabIndex={0}
        />
      </TableCell>
    </TableRow>
  );
};

export default Changelog;
