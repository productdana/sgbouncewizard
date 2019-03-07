import React from "react";
import { CSVLink } from "react-csv";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import Card from "@sendgrid/ui-components/card";
import Tooltip from "@sendgrid/ui-components/tooltip";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import Badge from "@sendgrid/ui-components/badge";
import { shouldDisplay, displayUnixAsTime } from "../../../utils/utils";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";
import { WriteSelectors } from "../selectors";

function showChanges(changelog, rulesToShow, handleChangelogClicked) {
  return changelog
    .slice(0, rulesToShow)
    .map((change, index) => (
      <Changes
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
  rulesToShow,
}) => (
  <div {...WriteSelectors.changelog}>
    <Row id="changelog-title">
      <Column width={1} offset={1}>
        <h2>Changelog</h2>
      </Column>
      <Column width={3} offset={9} className="changelog-csv sg-right">
        <CSVLink
          data={changelog}
          filename="changelog.csv"
          className="export-changelog-btn btn btn-secondary"
          target="_blank"
        >
          Export as CSV
        </CSVLink>
      </Column>
    </Row>
    {isChangelogEmpty && <EmptyChangelog />}
    {!isChangelogEmpty && (
      <Table className="changelog-table">
        <TableHeader>
          <TableRow>
            <HeaderCell className="row-date">Date</HeaderCell>
            <HeaderCell className="row-user">User</HeaderCell>
            <HeaderCell className="row-commit">Commit Message</HeaderCell>
            <HeaderCell className="row-actions actions-align">
              Actions
            </HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showChanges(changelog, rulesToShow, handleChangelogClicked)}
        </TableBody>
      </Table>
    )}
  </div>
);

const Changes = ({ change, handleChangelogClicked, index }) => {
  const { created_at: createdAt, user_id: userId, comment } = change;

  return (
    <TableRow>
      <TableCell>
        <div style={{ position: "relative" }}>
          <CurrentTag index={index} />
        </div>
        <TableCell>{shouldDisplay(displayUnixAsTime(createdAt))}</TableCell>
      </TableCell>
      <TableCell>{shouldDisplay(userId)}</TableCell>
      <TableCell>{shouldDisplay(comment)}</TableCell>
      {index === 0 && <TableCell>&nbsp;</TableCell>}
      {index !== 0 && (
        <ActionsCell>
          <Tooltip content="Revert to this change.">
            <Action
              className="changelog-view-icon"
              id="isRevertConfirmOpen"
              onClick={handleChangelogClicked}
              onKeyDown={handleChangelogClicked}
              index={index}
              icon="mc-return"
              role="button"
              tabIndex={0}
            />
          </Tooltip>
          <Tooltip content="View previous change details.">
            <Action
              className="changelog-view-icon"
              id="isChangeModalOpen"
              onClick={handleChangelogClicked}
              onKeyDown={handleChangelogClicked}
              index={index}
              view-index={index}
              icon="view"
              role="button"
              tabIndex={0}
            />
          </Tooltip>
        </ActionsCell>
      )}
    </TableRow>
  );
};

const CurrentTag = ({ index }) => {
  if (index === 0) {
    return (
      <Badge className="currentBadge" color="red" key="red">
        Current
      </Badge>
    );
  }
  return null;
};

export default Changelog;
