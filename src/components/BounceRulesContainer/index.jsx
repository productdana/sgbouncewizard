import React from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@sendgrid/ui-components/button";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { StatefulTabs as Tabs, Tab } from "@sendgrid/ui-components/tabs";
import Alert from "@sendgrid/ui-components/alert";
import Loader from "@sendgrid/ui-components/loader";
import Header from "../Header";
import { Row } from "../Row";
import { Column } from "../Column";
import Pagination from "../Pagination";
import RuleListContainer from "./RuleListContainer";
import RuleFilter from "./RuleFilter";
import EmptyRules from "./EmptyRules";
import DeleteConfirmationModal, {
  DeleteConfirmationAlert,
} from "./Modals/DeleteRuleModal";
import CreateRuleModal, {
  CreateConfirmationModal,
} from "./Modals/CreateRuleModal";
import "./index.scss";
import { WriteSelectors } from "./selectors";

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
  isValidFilter,
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
  handleActivityTabClicked,
  handleBounceTabClicked,
  isBounceRulesTab,
  isActivityLogTab,
  handleDeleteCommit,
  isNetworkError,
  handleDropdownSelect,
}) => {
  const isRulesEmpty = rules.length <= 0;
  const shouldShowBounceRulePagination =
    isBounceRulesTab && !isRulesEmpty && !isFetching;
  const shouldShowBounceRuleContainer =
    !isRulesEmpty && !isFetching && isBounceRulesTab;
  const shouldShowEmpty = isRulesEmpty && !isFetching;
  return (
    <React.Fragment>
      {isActivityLogTab && <Redirect push to="/activity_log" />}
      <div {...WriteSelectors.page}>
        {isNetworkError && (
          <Alert
            type="danger"
            dismissable={false}
            onClick={handleModalClose}
            id="isInvalidInput"
          >
            A network error is detected. Please
            <a href="/bounce_rules"> refresh </a>
            or try again later.
          </Alert>
        )}
        <Header logout={logout} />
        <Row>
          <Column width={6} offset={2}>
            <Breadcrumb>
              <Link to="/bounce_rules"> Bounce Rules</Link>
            </Breadcrumb>
          </Column>
        </Row>
        <Row>
          <Column className="csv-button-col" width={4} offset={8}>
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
            <Tabs className="page-tab" onChange={() => {}}>
              <Tab onClick={handleBounceTabClicked}>Bounce Rules</Tab>
              <Tab onClick={handleActivityTabClicked}>Activity Log</Tab>
            </Tabs>
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
                isValidFilter={isValidFilter}
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
            {shouldShowBounceRuleContainer && (
              <div {...WriteSelectors.ruleTable}>
                <RuleListContainer
                  handleActionOpen={handleActionOpen}
                  selectedRule={selectedRule}
                  rules={filteredRules}
                />
              </div>
            )}
            {shouldShowEmpty && (
              <div {...WriteSelectors.emptyRulesWarning}>
                <EmptyRules />
              </div>
            )}
          </Column>
        </Row>
        <Row>
          {shouldShowBounceRulePagination && (
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
            handleDropdownSelect={handleDropdownSelect}
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
            handleDeleteCommit={handleDeleteCommit}
            selectedRule={selectedRule}
          />
        )}
        {isDeleteAlertOpen && (
          <DeleteConfirmationAlert handleModalClose={handleModalClose} />
        )}
      </div>
    </React.Fragment>
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
  isValidFilter: PropTypes.bool,
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
  isFetching: PropTypes.bool,
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
  isFetching: false,
  isValidFilter: true,
};

export default BounceRulesContainer;
