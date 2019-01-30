import React from "react";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";

const RuleListContainer = ({ rules, handleActionOpen }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Bounce Action</HeaderCell>
        <HeaderCell>Response Code</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell className="actions-cell">Actions</HeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rules.map(rule => (
        <BounceRuleMin
          handleActionOpen={handleActionOpen}
          key={rule.id}
          rule={rule}
        />
      ))}
    </TableBody>
  </Table>
);

const BounceRuleMin = ({ rule, handleActionOpen }) => {
  const {
    id,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
  } = rule;
  return (
    <TableRow data-cypress={bounceAction}>
      <TableCell>{id}</TableCell>
      <TableCell>{bounceAction}</TableCell>
      <TableCell>{responseCode}</TableCell>
      <TableCell>{description}</TableCell>
      <ActionsCell>
        <Action
          title="View"
          onClick={handleActionOpen}
          id="isRedirectingToDetail"
          rule={id}
          icon="view"
        />
        <Action title="Edit" icon="pencil" />
        <Action
          title="Delete"
          onClick={handleActionOpen}
          rule={id}
          data-rule={id}
          id="isDeleteConfirmationOpen"
          icon="trash"
        />
      </ActionsCell>
    </TableRow>
  );
};

export default RuleListContainer;
