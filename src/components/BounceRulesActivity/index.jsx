import React from "react";
import { CSVLink } from "react-csv";
import "./index.scss";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { StatefulTabs as Tabs, Tab } from "@sendgrid/ui-components/tabs";
import Loader from "@sendgrid/ui-components/loader";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Header from "../Header";
import { Row } from "../Row";
import { Column } from "../Column";
import RuleFilter from "./RuleFilter";
import Pagination from "../Pagination";
import EmptyRules from "./EmptyRules";
import ActivityLogContainer from "./ActivityLogContainer";
import { WriteSelectors } from "./selectors";
import ActivityDetailsModal from "./ActivityDetailsModal";

const BounceRulesContainer = ({
  updateSearchToken,
  updateSearchCategory,
  removeFilter,
  filteredActivityLog,
  searchToken,
  rulesToShow,
  pagesToDisplay,
  filterOptions,
  addFilter,
  invalidFilter,
  handleModalClose,
  isFetching,
  logout,
  handleActivityTabClicked,
  handleBounceTabClicked,
  isBounceRulesTab,
  isActivityLogTab,
  activityLog,
  updateActivityLogIndex,
  handleActivityLogPrevClicked,
  handleActivityLogNextClicked,
  currentActivityPageIndex,
  handleActivityClicked,
  selectedActivity,
  isActivityModalOpen,
}) => {
  const isActivityEmpty = activityLog.length <= 0;
  const shouldShowActivityLogPagination =
    isActivityLogTab && !isActivityEmpty && !isFetching;
  const shouldShowActivityLogContainer = isActivityLogTab && !isActivityEmpty;
  const shouldShowEmpty = isActivityEmpty && !isFetching;
  return (
    <React.Fragment>
      {isBounceRulesTab && <Redirect push to="/bounce_rules" />}
      <div {...WriteSelectors.page} className="container">
        <Header logout={logout} />
        <Row>
          <Column width={6} offset={2}>
            <Breadcrumb>
              <a {...WriteSelectors.breadcrumb} href="/activity_log">
                Activity Log
              </a>
            </Breadcrumb>
          </Column>
        </Row>
        <Row>
          <Column className=" csv-button-col" width={4} offset={8}>
            <CSVLink
              {...WriteSelectors.csvButton}
              filename="activity_log.csv"
              className="sg-button btn btn-secondary sg-right"
              data={activityLog}
            >
              Export CSV
            </CSVLink>
          </Column>
        </Row>
        <Row>
          <Column width={10} offset={2}>
            <Tabs className="rules-tab" onChange={() => {}}>
              <Tab onClick={handleBounceTabClicked}>Bounce Rules</Tab>
              <Tab onClick={handleActivityTabClicked} active>
                Activity Log
              </Tab>
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
            {shouldShowEmpty && (
              <div {...WriteSelectors.emptyRulesWarning}>
                <EmptyRules />
              </div>
            )}
            {shouldShowActivityLogContainer && (
              <div {...WriteSelectors.activityTable}>
                <ActivityLogContainer
                  activityLog={filteredActivityLog}
                  handleActivityClicked={handleActivityClicked}
                />
              </div>
            )}
          </Column>
        </Row>
        <Row>
          <Column width={4} offset={5}>
            {shouldShowActivityLogPagination && (
              <Pagination
                handlePrevClicked={handleActivityLogPrevClicked}
                handleNextClicked={handleActivityLogNextClicked}
                currentPageIndex={currentActivityPageIndex}
                rulesToShow={rulesToShow}
                numRules={activityLog.length}
                updatePageIndex={updateActivityLogIndex}
                pagesToDisplay={pagesToDisplay}
              />
            )}
          </Column>
        </Row>
        {isActivityModalOpen && (
          <ActivityDetailsModal
            handleModalClose={handleModalClose}
            selectedChange={selectedActivity}
          />
        )}
      </div>
    </React.Fragment>
  );
};

BounceRulesContainer.propTypes = {
  updateSearchToken: PropTypes.func,
  updateSearchCategory: PropTypes.func,
  removeFilter: PropTypes.func,
  handlePrevClicked: PropTypes.func,
  handleNextClicked: PropTypes.func,
  updatePageIndex: PropTypes.func,
  searchToken: PropTypes.string,
  currentPageIndex: PropTypes.number,
  rulesToShow: PropTypes.number,
  pagesToDisplay: PropTypes.number,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      searchCategory: PropTypes.string,
      searchToken: PropTypes.string,
    })
  ),
  addFilter: PropTypes.func,
  invalidFilter: PropTypes.bool,
  isCreateRuleOpen: PropTypes.bool,
  handleModalClose: PropTypes.func,
  isFetching: PropTypes.bool,
  numRules: PropTypes.number,
};

BounceRulesContainer.defaultProps = {
  updateSearchToken: () => {},
  updateSearchCategory: () => {},
  removeFilter: () => {},
  handlePrevClicked: () => {},
  handleNextClicked: () => {},
  updatePageIndex: () => {},
  searchToken: "",
  currentPageIndex: 1,
  rulesToShow: 10,
  pagesToDisplay: 5,
  numRules: 0,
  filterOptions: () => {},
  addFilter: () => {},
  invalidFilter: false,
  isCreateRuleOpen: false,
  handleModalClose: () => {},
  isFetching: false,
};

export default BounceRulesContainer;
