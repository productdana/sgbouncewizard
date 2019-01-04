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
import { CSVLink } from "react-csv";
import { Row } from "../../Row";
import { Column } from "../../Column";

import { WriteSelectors } from "../selectors";

function showIndividualChanges(
  changelog,
  changelogLimit,
  handleChangelogClicked
) {
  return changelog
    .slice(0, changelogLimit)
    .map((change, index) => (
      <IndividualChange
        key={change.created_at}
        index={index}
        change={change}
        handleChangelogClicked={handleChangelogClicked}
      />
    ));
}

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
  <div {...WriteSelectors.changelog}>
    <Row id="changelog-title">
      <Column width={1} offset={1}>
        <h2>Changelog</h2>
      </Column>
      <Column width={2} offset={11} className="changelog-csv sg-right">
        <CSVLink data={changelog} filename="changelog.csv" target="_blank">
          Export as CSV
        </CSVLink>
      </Column>
    </Row>
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
          {showIndividualChanges(
            changelog,
            changelogLimit,
            handleChangelogClicked
          )}
        </TableBody>
      </Table>
    )}
  </div>
);

const IndividualChange = ({ change, handleChangelogClicked, index }) => {
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
