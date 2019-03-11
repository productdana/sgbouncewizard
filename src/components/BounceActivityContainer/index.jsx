import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { StatefulTabs as Tabs, Tab } from "@sendgrid/ui-components/tabs";
import Alert from "@sendgrid/ui-components/alert";
import Loader from "@sendgrid/ui-components/loader";
import Header from "../shared/Header";
import { Row } from "../shared/Row";
import { Column } from "../shared/Column";
import Pagination from "../shared/Pagination";
import ActivityFilter from "../shared/Filter/ActivityFilter";
import EmptyRules from "../shared/EmptyRules";
import ActivityLogContainer from "./ActivityLogContainer";
import ActivityDetailsModal from "./Modals/ActivityDetailsModal";
import { WriteSelectors } from "./selectors";
import "./index.scss";

const BounceActivityContainer = ({
  updateFilterBy,
  updateFilterOption,
  removeFilter,
  filteredActivityLog,
  searchToken,
  rulesToShow,
  pagesToDisplay,
  filterOptions,
  addFilter,
  isValidFilter,
  handleModalClose,
  isFetching,
  logout,
  handleActivityTabClicked,
  handleBounceTabClicked,
  isBounceRulesTab,
  isActivityLogTab,
  activityLog,
  updatePageIndex,
  handlePrevClicked,
  handleNextClicked,
  currentPageIndex,
  handleActivityClicked,
  selectedActivity,
  isActivityModalOpen,
  isNetworkError,
  filterQuery,
  handleOptionSelector,
}) => {
  const isActivityEmpty = activityLog.length === 0;
  const shouldShowActivityLogPagination =
    isActivityLogTab && !isActivityEmpty && !isFetching;
  const shouldShowActivityLogContainer = isActivityLogTab && !isActivityEmpty;
  const shouldShowEmpty = isActivityEmpty && !isFetching;
  return (
    <React.Fragment>
      {isBounceRulesTab && <Redirect push to="/bounce_rules" />}
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
              <Link to="/activity_log"> Activity Log</Link>
            </Breadcrumb>
          </Column>
        </Row>
        <Row>
          <Column width={10} offset={2}>
            <Tabs className="page-tab" onChange={() => {}}>
              <Tab onClick={handleBounceTabClicked}>Bounce Rules</Tab>
              <Tab onClick={handleActivityTabClicked} active>
                Activity Log
              </Tab>
            </Tabs>
          </Column>
        </Row>
        <Row>
          <Column className="csv-button-col" width={4} offset={8}>
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
            <div {...WriteSelectors.activityFilter}>
              <ActivityFilter
                filterQuery={filterQuery}
                updateFilterBy={updateFilterBy}
                updateFilterOption={updateFilterOption}
                handleOptionSelector={handleOptionSelector}
                searchToken={searchToken}
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
          {shouldShowActivityLogPagination && (
            <Pagination
              handlePrevClicked={handlePrevClicked}
              handleNextClicked={handleNextClicked}
              currentPageIndex={currentPageIndex}
              rulesToShow={rulesToShow}
              numRules={activityLog.length}
              updatePageIndex={updatePageIndex}
              pagesToDisplay={pagesToDisplay}
            />
          )}
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

BounceActivityContainer.propTypes = {
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
  isValidFilter: PropTypes.bool,
  isCreateRuleOpen: PropTypes.bool,
  handleModalClose: PropTypes.func,
  isFetching: PropTypes.bool,
  numRules: PropTypes.number,
};

BounceActivityContainer.defaultProps = {
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
  isCreateRuleOpen: false,
  handleModalClose: () => {},
  isFetching: false,
  isValidFilter: true,
};

export default BounceActivityContainer;
