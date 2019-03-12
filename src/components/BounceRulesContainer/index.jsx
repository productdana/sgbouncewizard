import React from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@sendgrid/ui-components/button";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { StatefulTabs as Tabs, Tab } from "@sendgrid/ui-components/tabs";
import Loader from "@sendgrid/ui-components/loader";
import Header from "../shared/Header";
import { Row } from "../shared/Row";
import { Column } from "../shared/Column";
import Pagination from "../shared/Pagination";
import RuleListContainer from "./RuleListContainer";
import RuleFilter from "../shared/Filter/RuleFilter";
import EmptyRules from "../shared/EmptyRules";
import NetworkAlert from "../shared/Alerts/NetworkAlert";
import ConfirmationModal from "../shared/ConfirmationModal";
import CreateRuleModal from "./Modals/CreateRuleModal";
import "./index.scss";
import { WriteSelectors } from "./selectors";

const BounceRulesContainer = ({
  rules,
  filterQuery,
  updateFilterBy,
  updateFilterOption,
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
  handleClearSearch,
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
  handleCreateCommit,
  handleDropdownSelect,
  isCommitValid,
  handleOptionSelector,
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
          <NetworkAlert
            reloadLink="/bounce_rules"
            handleModalClose={handleModalClose}
          />
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
          <Column width={10} offset={2}>
            <Tabs className="page-tab" onChange={() => {}}>
              <Tab onClick={handleBounceTabClicked}>Bounce Rules</Tab>
              <Tab onClick={handleActivityTabClicked}>Activity Log</Tab>
            </Tabs>
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
            <div {...WriteSelectors.ruleFilter}>
              <RuleFilter
                filterQuery={filterQuery}
                searchToken={searchToken}
                updateFilterBy={updateFilterBy}
                updateFilterOption={updateFilterOption}
                isValidFilter={isValidFilter}
                handleClearSearch={handleClearSearch}
                handleOptionSelector={handleOptionSelector}
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
          <ConfirmationModal
            selectors={WriteSelectors}
            isCommitValid={isCommitValid}
            selectedRule={newRule}
            handleConfirm={handleCreateConfirm}
            handleModalClose={handleModalClose}
            handleOnChange={handleCreateCommit}
            toggleId="isCreateRuleConfirmationOpen"
            isNetworkError={isNetworkError}
          />
        )}
        {isDeleteConfirmationOpen && (
          <ConfirmationModal
            selectors={WriteSelectors}
            isCommitValid={isCommitValid}
            selectedRule={selectedRule}
            handleConfirm={handleDeleteConfirm}
            handleModalClose={handleModalClose}
            handleOnChange={handleDeleteCommit}
            toggleId="isDeleteConfirmationOpen"
            isNetworkError={isNetworkError}
          />
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
  updateFilterBy: PropTypes.func,
  updateFilterOption: PropTypes.func,
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
  updateFilterBy: () => {},
  updateFilterOption: () => {},
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
