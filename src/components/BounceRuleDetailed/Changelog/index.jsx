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

const Changelog = ({
  handleChangelogClicked,
  changelog,
  isChangelogEmpty,
  changelogLimit,
}) => (
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
          {changelog.slice(0, changelogLimit).map((change, index) => (
            <ChangelogMin
              key={change.created_at}
              index={index}
              change={change}
              handleChangelogClicked={handleChangelogClicked}
            />
          ))}
        </TableBody>
      </Table>
    )}
  </div>
);

const ChangelogMin = ({ change, handleChangelogClicked, index }) => {
  const { created_at: createdAt, user_id: userId, comment } = change;

  return (
    <TableRow>
      <TableCell>
        <Moment unix>{createdAt}</Moment>
      </TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell className="changelog-view-icon-cell">
        <i
          onClick={handleChangelogClicked}
          id="changeClicked"
          index={index}
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
