import React from "react";
import { CSVLink } from "react-csv";
import "./index.scss";
import { Button } from "@sendgrid/ui-components/button";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import Loader from "@sendgrid/ui-components/loader";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import PropTypes from "prop-types";
import Header from "../Header";
import { Row } from "../Row";
import { Column } from "../Column";
import RuleFilter from "./RuleFilter";
import Pagination from "../Pagination";
import EmptyRules from "./EmptyRules";
import DeleteConfirmationModal, {
  DeleteConfirmationAlert,
} from "./DeleteRuleModal";
import CreateRuleModal, { CreateConfirmationModal } from "./CreateRuleModal";
import { WriteSelectors } from "./selectors";

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

const BounceRulesContainer = ({
  rules,
  updateSearchToken,
  updateSearchCategory,
  removeFilter,
  handlePrevClicked,
  handleNextClicked,
  updatePageIndex,
  filteredRules,
  searchToken,
  selectedRule,
  currentPageIndex,
  rulesToShow,
  pagesToDisplay,
  numRules,
  filterOptions,
  addFilter,
  invalidFilter,
  isCreateRuleOpen,
  handleRuleUpdate,
  handleRuleUpdateInt,
  handleCreateSubmit,
  isCreateRuleConfirmationOpen,
  handleCreateConfirm,
  newRule,
  isInvalidInput,
  isDeleteConfirmationOpen,
  isDeleteAlertOpen,
  idToDelete,
  handleDeleteConfirm,
  handleModalClose,
  handleCreateOpen,
  handleActionOpen,
  isFetching,
  logout,
}) => {
  const isRulesEmpty = rules.length <= 0;
  return (
    <div {...WriteSelectors.page} className="container">
      <Header logout={logout} />
      <Row>
        <Column width={6} offset={2}>
          <Breadcrumb>
            <a {...WriteSelectors.breadcrumb} href="/bounce_rules">
              Bounce Rules
            </a>
          </Breadcrumb>
        </Column>
      </Row>
      <Row>
        <Column width={2} offset={2}>
          <h1>Bounce Rules</h1>
        </Column>
        <Column className=" csv-button-col" width={4} offset={8}>
          <CSVLink
            {...WriteSelectors.csvButton}
            filename="bounce_rules.csv"
            className="sg-button btn btn-secondary sg-right"
            data={rules}
          >
            Export CSV
          </CSVLink>
          <Button
            {...WriteSelectors.createRuleButton}
            onClick={handleCreateOpen}
            onKeyDown={handleCreateOpen}
            id="isCreateRuleOpen"
            data-button="create-button"
            className="create-rule-button"
            type="primary"
          >
            Create Rule
          </Button>
        </Column>
      </Row>
      <Row>
        <Column width={10} offset={2}>
          <div {...WriteSelectors.ruleFilter}>
            <RuleFilter
              searchToken={searchToken}
              updateSearchToken={updateSearchToken}
              updateSearchCategory={updateSearchCategory}
              filterOptions={filterOptions}
              addFilter={addFilter}
              removeFilter={removeFilter}
              invalidFilter={invalidFilter}
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column width={10} offset={2}>
          {isFetching && (
            <div className="bounce-rule-loader">
              <Loader centered />
              <Row>
                <p className="loading">Loading Rules</p>
              </Row>
            </div>
          )}
          {!isRulesEmpty &&
            !isFetching && (
              <div {...WriteSelectors.ruleTable}>
                <RuleListContainer
                  handleActionOpen={handleActionOpen}
                  selectedRule={selectedRule}
                  rules={filteredRules}
                />
              </div>
            )}
          {isRulesEmpty &&
            !isFetching && (
              <div {...WriteSelectors.emptyRulesWarning}>
                <EmptyRules />
              </div>
            )}
        </Column>
      </Row>
      <Row>
        <Column width={4} offset={5}>
          {!isRulesEmpty &&
            !isFetching && (
              <Pagination
                handlePrevClicked={handlePrevClicked}
                handleNextClicked={handleNextClicked}
                currentPageIndex={currentPageIndex}
                rulesToShow={rulesToShow}
                numRules={numRules}
                updatePageIndex={updatePageIndex}
                pagesToDisplay={pagesToDisplay}
              />
            )}
        </Column>
      </Row>
      {isCreateRuleOpen && (
        <CreateRuleModal
          {...WriteSelectors.createRuleModal}
          newRule={newRule}
          isInvalidInput={isInvalidInput}
          handleModalClose={handleModalClose}
          handleRuleUpdate={handleRuleUpdate}
          handleRuleUpdateInt={handleRuleUpdateInt}
          handleCreateSubmit={handleCreateSubmit}
        />
      )}
      {isCreateRuleConfirmationOpen && (
        <CreateConfirmationModal
          {...WriteSelectors.confirmModal}
          newRule={newRule}
          handleModalClose={handleModalClose}
          handleCreateConfirm={handleCreateConfirm}
          handleRuleUpdate={handleRuleUpdate}
        />
      )}
      {isDeleteConfirmationOpen && (
        <DeleteConfirmationModal
          idToDelete={idToDelete}
          handleModalClose={handleModalClose}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}
      {isDeleteAlertOpen && (
        <DeleteConfirmationAlert handleModalClose={handleModalClose} />
      )}
    </div>
  );
};

BounceRulesContainer.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      response_code: PropTypes.number,
      enhanced_code: PropTypes.string,
      regex: PropTypes.string,
      priority: PropTypes.number,
      description: PropTypes.string,
      bounce_action: PropTypes.string,
    })
  ),
  updateSearchToken: PropTypes.func,
  updateSearchCategory: PropTypes.func,
  removeFilter: PropTypes.func,
  handlePrevClicked: PropTypes.func,
  handleNextClicked: PropTypes.func,
  updatePageIndex: PropTypes.func,
  filteredRules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      response_code: PropTypes.number,
      enhanced_code: PropTypes.string,
      regex: PropTypes.string,
      priority: PropTypes.number,
      description: PropTypes.string,
      bounce_action: PropTypes.string,
    })
  ),
  searchToken: PropTypes.string,
  selectedRule: PropTypes.shape({
    id: PropTypes.number,
    response_code: PropTypes.number,
    enhanced_code: PropTypes.string,
    regex: PropTypes.string,
    priority: PropTypes.number,
    description: PropTypes.string,
    bounce_action: PropTypes.string,
  }),
  currentPageIndex: PropTypes.number,
  rulesToShow: PropTypes.number,
  pagesToDisplay: PropTypes.number,
  numRules: PropTypes.number,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      searchCategory: PropTypes.string,
      searchToken: PropTypes.string,
    })
  ),
  addFilter: PropTypes.func,
  invalidFilter: PropTypes.bool,
  isCreateRuleOpen: PropTypes.bool,
  handleRuleUpdate: PropTypes.func,
  handleCreateSubmit: PropTypes.func,
  isCreateRuleConfirmationOpen: PropTypes.bool,
  handleCreateConfirm: PropTypes.func,
  newRule: PropTypes.shape({
    id: PropTypes.number,
    response_code: PropTypes.number,
    enhanced_code: PropTypes.string,
    regex: PropTypes.string,
    priority: PropTypes.number,
    description: PropTypes.string,
    bounce_action: PropTypes.string,
  }),
  isInvalidInput: PropTypes.bool,
  isDeleteConfirmationOpen: PropTypes.bool,
  isDeleteAlertOpen: PropTypes.bool,
  idToDelete: PropTypes.number,
  handleDeleteConfirm: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateOpen: PropTypes.func,
  handleActionOpen: PropTypes.func,
};

BounceRulesContainer.defaultProps = {
  rules: [],
  updateSearchToken: () => {},
  updateSearchCategory: () => {},
  removeFilter: () => {},
  handlePrevClicked: () => {},
  handleNextClicked: () => {},
  updatePageIndex: () => {},
  filteredRules: [],
  searchToken: "",
  selectedRule: {},
  currentPageIndex: 1,
  rulesToShow: 10,
  pagesToDisplay: 5,
  numRules: 0,
  filterOptions: () => {},
  addFilter: () => {},
  invalidFilter: false,
  isCreateRuleOpen: false,
  handleRuleUpdate: () => {},
  handleCreateSubmit: () => {},
  isCreateRuleConfirmationOpen: false,
  handleCreateConfirm: () => {},
  newRule: {},
  isInvalidInput: false,
  isDeleteConfirmationOpen: false,
  isDeleteAlertOpen: false,
  idToDelete: null,
  handleDeleteConfirm: () => {},
  handleModalClose: () => {},
  handleCreateOpen: () => {},
  handleActionOpen: () => {},
};

export default BounceRulesContainer;
export { RuleListContainer, BounceRuleMin };
