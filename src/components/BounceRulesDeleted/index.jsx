import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Column } from "../Column";
import { Row } from "../Row";
import Header from "../Header";

const DeletedRuleContainer = ({ deletedRules }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Created Date</HeaderCell>
        <HeaderCell>Response Code</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell className="actions-cell">Actions</HeaderCell>
      </TableRow>
    </TableHeader>
    {deletedRules.length > 0 && (
      <TableBody>
        {deletedRules.map(rule => (
          <DeletedRuleMin key={rule.created_at} deletedRule={rule} />
        ))}
      </TableBody>
    )}
  </Table>
);

const DeletedRuleMin = ({ deletedRule }) => {
  const {
    id,
    created_at: createdAt,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
  } = deletedRule;
  return (
    <TableRow data-cypress={bounceAction}>
      <TableCell>{id}</TableCell>
      <TableCell>{moment.unix(createdAt).format("MM/DD/YYYY LTS")}</TableCell>
      <TableCell>{responseCode}</TableCell>
      <TableCell>{description}</TableCell>
      <ActionsCell>
        <Action title="View" id="isRedirectingToDetail" rule={id} icon="view" />
      </ActionsCell>
    </TableRow>
  );
};

const BounceRulesDeleted = ({ logout, deletedRules }) => (
  <div className="container">
    <Header logout={logout} />
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb>
          <Link to="/bounce_rules">Bounce Rules</Link>
        </Breadcrumb>
      </Column>
    </Row>
    <Row>
      <Column width={3} offset={2}>
        <h1>Deleted Bounce Rules</h1>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <DeletedRuleContainer deletedRules={deletedRules} />
      </Column>
    </Row>
  </div>
);

export default BounceRulesDeleted;
