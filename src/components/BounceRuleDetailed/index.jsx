import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { Link } from "react-router-dom";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Row } from "../Row";
import { Column } from "../Column";
import Header from "../Header";
import Pagination from "../Pagination";
import "./index.scss";

const mockChangelog = [
  {
    id: "1",
    date: "11.07.2018",
    user: "Cody",
    message: "Fixed another another typo in the description",
  },
  {
    id: "2",
    date: "11.06.2018",
    user: "Joseph",
    message: "Fixed another typo in the description",
  },
  {
    id: "3",
    date: "11.05.2018",
    user: "Kristen",
    message: "Fixed a typo in the description",
  },
];

const DetailContainer = ({ currentRule }) => (
  <div className="detail-container card ">
    <div className="description-info">
      <Table className="table-fixed">
        <TableBody>
          <TableRow>
            <TableCell className="description-cell">
              <strong>Description</strong>
            </TableCell>
            <TableCell> {currentRule.description} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div className="detail-info">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Bounce ID</strong>
            </TableCell>
            <TableCell> {currentRule.id} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Response Code</strong>
            </TableCell>
            <TableCell> {currentRule.response_code} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Enhanced Code</strong>
            </TableCell>
            <TableCell> {currentRule.enhanced_code} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Regex</strong>
            </TableCell>
            <TableCell> {currentRule.regex} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Priority</strong>
            </TableCell>
            <TableCell> {currentRule.priority} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Bounce Action</strong>
            </TableCell>
            <TableCell> {currentRule.bounce_action} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

const Changelog = () => (
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
          <ChangelogMin key={change.id} change={change} />
        ))}
      </TableBody>
    </Table>
  </div>
);

const ChangelogMin = change => (
  <TableRow>
    <TableCell>{change.change.date}</TableCell>
    <TableCell>{change.change.user}</TableCell>
    <TableCell>{change.change.message}</TableCell>
    <ActionsCell>
      <Action title="View" onClick={() => {}} icon="view" />
      <Action title="Edit" icon="pencil" />
      <Action title="Delete" icon="trash" />
    </ActionsCell>
  </TableRow>
);

const BounceRuleDetailed = ({ currentRule }) => (
  <div className="detailed-page-container">
    <Header />
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb>
          <Link to="/bounce_rules">Bounce Rules</Link>
          <Link to={`/bounce_rules/${currentRule.id}`}>{currentRule.id}</Link>
        </Breadcrumb>
      </Column>
    </Row>
    <Row>
      <Column width={6} offset={2}>
        <h1>Bounce Rule 173</h1>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <DetailContainer currentRule={currentRule} />
      </Column>
    </Row>
    <Row className="changelog-container">
      <Column width={10} offset={2}>
        <Changelog />
      </Column>
    </Row>
    <Row>
      <Column width={4} offset={5}>
        <Pagination
          prevPageIndex={1}
          nextPageIndex={10}
          pageIndex={1}
          pageInterval={1}
          numRules={3}
          updatePageIndex={() => {}}
        />
      </Column>
    </Row>
  </div>
);

export default BounceRuleDetailed;
