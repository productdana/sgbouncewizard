import React from "react";
import "./index.scss";
import { Button } from "@sendgrid/ui-components/button";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Row } from "../Row";
import { Column } from "../Column";
import Breadcrumb from "../Breadcrumb";
import RuleFilter from "../RuleFilter";
import Pagination from "../Pagination";

const RuleListContainer = ({ rules }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Bounce Action</HeaderCell>
        <HeaderCell>Response Code</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell>Actions</HeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rules.map(rule => (
        <BounceRuleMin key={rule.id} rule={rule} />
      ))}
    </TableBody>
  </Table>
);

const BounceRuleMin = ({ rule }) => (
  <TableRow>
    <TableCell>{rule.id}</TableCell>
    <TableCell>{rule.bounce_action}</TableCell>
    <TableCell>{rule.response_code}</TableCell>
    <TableCell>{rule.description}</TableCell>
    <ActionsCell>
      <Action title="View" icon="view" />
      <Action title="Edit" icon="pencil" />
      <Action title="Delete" icon="trash" />
    </ActionsCell>
  </TableRow>
);

const BounceRulesContainer = ({
  handleRuleClick,
  handleKeyDown,
  updateSearchToken,
  updateSearchCategory,
  removeFilter,
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  filterRules,
  filteredRules,
  searchToken,
  searchCategory,
  selectedRule,
  rules,
  pageIndex,
  pageInterval,
  numRules,
  filterOptions,
  addFilter,
  invalidFilter,
}) => (
  <div className="container">
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb />
      </Column>
    </Row>
    <Row>
      <Column width={2} offset={2}>
        <h1>Bounce Rules</h1>
      </Column>
      <Column width={4} offset={5}>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <img
            alt="sendgrid-logo"
            style={{ maxWidth: "45%" }}
            src="https://uiux.s3.amazonaws.com/toggleable-logos/header-logo.svg"
          />
        </div>
      </Column>
      <Column width={3} offset={9}>
        <div style={{ textAlign: "right" }}>
          <Button type="primary">Create Bounce Rule</Button>
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <RuleFilter
          rules={rules}
          searchToken={searchToken}
          searchCategory={searchCategory}
          updateSearchToken={updateSearchToken}
          updateSearchCategory={updateSearchCategory}
          filterOptions={filterOptions}
          addFilter={addFilter}
          removeFilter={removeFilter}
          invalidFilter={invalidFilter}
        />
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <RuleListContainer
          filterRules={filterRules}
          handleRuleClick={handleRuleClick}
          handleKeyDown={handleKeyDown}
          selectedRule={selectedRule}
          rules={filteredRules}
        />
      </Column>
    </Row>
    <Row>
      <Column width={4} offset={5}>
        <Pagination
          prevPageIndex={prevPageIndex}
          nextPageIndex={nextPageIndex}
          pageIndex={pageIndex}
          pageInterval={pageInterval}
          numRules={numRules}
          updatePageIndex={updatePageIndex}
        />
      </Column>
    </Row>
  </div>
);

export default BounceRulesContainer;
