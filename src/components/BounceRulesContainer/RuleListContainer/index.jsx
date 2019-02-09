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
import { shouldDisplay } from "../../../utils/utils";
import "./index.scss";

const RuleListContainer = ({ rules, handleActionOpen }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell className="row-id">Id</HeaderCell>
        <HeaderCell className="row-bounce-action">Bounce Action</HeaderCell>
        <HeaderCell className="row-response-code">Response Code</HeaderCell>
        <HeaderCell className="row-description">Description</HeaderCell>
        <HeaderCell className="actions-cell row-action">Actions</HeaderCell>
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
      <TableCell>{shouldDisplay(id)}</TableCell>
      <TableCell>{shouldDisplay(bounceAction)}</TableCell>
      <TableCell>{shouldDisplay(responseCode)}</TableCell>
      <TableCell>{shouldDisplay(description)}</TableCell>
      <ActionsCell>
        <Action
          title="View"
          onClick={handleActionOpen}
          id="isRedirectingToDetail"
          rule={id}
          icon="view"
        />
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
