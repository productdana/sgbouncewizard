import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { Link } from "react-router-dom";
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
import "./index.scss";

const DetailContainer = ({ currentRule }) => (
  <div className="detail-container card ">
    <div className="description-info">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
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
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>Change Description</HeaderCell>
          <HeaderCell>Action</HeaderCell>
        </TableRow>
      </TableHeader>
    </Table>
  </div>
);

const BounceRuleDetailed = ({ currentRule }) => (
  <div className="detailed-page-container">
    <Header />
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb>
          <Link to="/bounce_rules">Bounce Rules</Link>
          <Link to={`/bounce_rules/${  currentRule.id}`}>{currentRule.id}</Link>
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
  </div>
);

export default BounceRuleDetailed;
