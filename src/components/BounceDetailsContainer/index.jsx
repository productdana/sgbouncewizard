import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import Button from "@sendgrid/ui-components/button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row } from "../shared/Row";
import { Column } from "../shared/Column";
import Header from "../shared/Header";
import Pagination from "../shared/Pagination";
import DetailsContainer, { DetailsContainerEditable } from "./Details";
import Changelog from "./Changelog";
import ChangeModal from "./Modals/ChangeModal";
import CancelConfirmationModal from "./Modals/CancelConfirmationModal";
import NetworkAlert from "../shared/Alerts/NetworkAlert";
import ConfirmationModal from "../shared/ConfirmationModal";
import "./index.scss";
import { WriteSelectors } from "./selectors";

const BounceRuleDetailed = ({
  currentRule,
  updatedRule,
  changelog,
  selectedChange,
  isEditClicked,
  isChangeModalOpen,
  isConfirmOpen,
  isCancelConfirmOpen,
  isRevertConfirmOpen,
  isUpdateError,
  rulesToShow,
  handleModalClose,
  onChangeRule,
  handleEditClicked,
  handleConcurrentEditClicked,
  handleCancelSaveClicked,
  handleChangelogClicked,
  handleRevertClicked,
  handleCancelConfirmation,
  handleSaveConfirmation,
  handleRevertConfirm,
  onChangeRevert,
  onChangeRuleInt,
  pagesToDisplay,
  currentPageIndex,
  handleNextClicked,
  handlePrevClicked,
  updatePageIndex,
  filteredChangelog,
  logout,
  userCanEditRule,
  isNetworkError,
  handleRevertModalClose,
  handleDropdownSelect,
  isCommitValid,
}) => {
  const { id } = currentRule;
  const isChangelogEmpty = changelog === undefined || changelog.length < 1;

  return (
    <div>
      {isNetworkError && (
        <NetworkAlert
          reloadLink={`/bounce_rules/${id}`}
          handleModalClose={handleModalClose}
        />
      )}
      <Header logout={logout} />
      <Row>
        <Column width={6} offset={2}>
          <Breadcrumb>
            <Link to="/bounce_rules">Bounce Rules</Link>
            <Link to={`/bounce_rules/${id}`}>{id}</Link>
          </Breadcrumb>
        </Column>
      </Row>
      <Row>
        <Column width={6} offset={2}>
          <h1>Bounce Rule {id}</h1>
        </Column>
        {isEditClicked && (
          <Column className="csv-button-col" width={4} offset={8}>
            <Button
              onClick={handleCancelSaveClicked}
              id="isCancelConfirmOpen"
              onKeyDown={handleCancelSaveClicked}
              {...WriteSelectors.cancelButton}
              className="sg-button cancel-button sg-right"
              type="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCancelSaveClicked}
              id="isConfirmOpen"
              onKeyDown={handleCancelSaveClicked}
              {...WriteSelectors.saveButton}
              className="sg-button save-button"
              type="primary"
            >
              Save
            </Button>
          </Column>
        )}
        {!isEditClicked && (
          <Column className="details-button-column" width={1} offset={11}>
            <span>
              <Button
                onClick={handleConcurrentEditClicked}
                id="isEditClicked"
                onKeyDown={handleConcurrentEditClicked}
                {...WriteSelectors.editButton}
                className="sg-button edit-button"
                type="primary"
                icon={!userCanEditRule ? "locked" : ""}
                disabled={!userCanEditRule}
              >
                {userCanEditRule ? "Edit Rule" : "In Use"}
              </Button>
            </span>
          </Column>
        )}
      </Row>
      <Row>
        <Column width={10} offset={2}>
          <div>
            {isEditClicked && (
              <DetailsContainerEditable
                {...WriteSelectors.detailsEditable}
                currentRule={currentRule}
                onChangeRule={onChangeRule}
                onChangeRuleInt={onChangeRuleInt}
                updatedRule={updatedRule}
                handleDropdownSelect={handleDropdownSelect}
              />
            )}
            {!isEditClicked && (
              <DetailsContainer
                {...WriteSelectors.details}
                currentRule={currentRule}
                handleEditClicked={handleEditClicked}
              />
            )}
          </div>
        </Column>
      </Row>
      <Row className="changelog-container">
        <Column width={10} offset={2}>
          <Changelog
            {...WriteSelectors.changelog}
            rulesToShow={rulesToShow}
            handleChangelogClicked={handleChangelogClicked}
            changelog={filteredChangelog}
            isChangelogEmpty={isChangelogEmpty}
          />
        </Column>
      </Row>
      {!isChangelogEmpty && (
        <Row>
          <Pagination
            {...WriteSelectors.pagination}
            handlePrevClicked={handlePrevClicked}
            handleNextClicked={handleNextClicked}
            pagesToDisplay={pagesToDisplay}
            currentPageIndex={currentPageIndex}
            rulesToShow={rulesToShow}
            numRules={changelog.length}
            updatePageIndex={updatePageIndex}
          />
        </Row>
      )}
      {isChangeModalOpen && (
        <ChangeModal
          {...WriteSelectors.changelogModal}
          currentRule={currentRule}
          changelog={changelog}
          selectedChange={selectedChange}
          handleModalClose={handleModalClose}
          handleRevertClicked={handleRevertClicked}
        />
      )}
      {isRevertConfirmOpen && (
        <ConfirmationModal
          {...WriteSelectors.confirmModal}
          selectors={WriteSelectors}
          toggleId="isRevertConfirmOpen"
          isCommitValid={isCommitValid}
          selectedRule={selectedChange}
          handleConfirm={handleRevertConfirm}
          handleModalClose={handleRevertModalClose}
          handleOnChange={onChangeRevert}
          isUpdateError={isUpdateError}
          isNetworkError={isNetworkError}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          {...WriteSelectors.confirmModal}
          selectors={WriteSelectors}
          toggleId="isConfirmOpen"
          isCommitValid={isCommitValid}
          handleOnChange={onChangeRule}
          selectedRule={updatedRule}
          handleModalClose={handleModalClose}
          handleConfirm={handleSaveConfirmation}
          isUpdateError={isUpdateError}
          isNetworkError={isNetworkError}
        />
      )}
      {isCancelConfirmOpen && (
        <CancelConfirmationModal
          {...WriteSelectors.cancelConfirmationModal}
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          handleCancelConfirmation={handleCancelConfirmation}
        />
      )}
    </div>
  );
};
BounceRuleDetailed.propTypes = {
  currentRule: PropTypes.shape({
    id: PropTypes.number,
    response_code: PropTypes.number,
    enhanced_code: PropTypes.string,
    regex: PropTypes.string,
    priority: PropTypes.number,
    description: PropTypes.string,
    bounce_action: PropTypes.string,
  }),
  newRule: PropTypes.shape({
    id: PropTypes.number,
    response_code: PropTypes.number,
    enhanced_code: PropTypes.string,
    regex: PropTypes.string,
    priority: PropTypes.number,
    description: PropTypes.string,
    bounce_action: PropTypes.string,
  }),
  changelog: PropTypes.arrayOf(
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
  selectedChange: PropTypes.shape({
    id: PropTypes.number,
    response_code: PropTypes.number,
    enhanced_code: PropTypes.string,
    regex: PropTypes.string,
    priority: PropTypes.number,
    description: PropTypes.string,
    bounce_action: PropTypes.string,
  }),
  isEditClicked: PropTypes.bool,
  isChangeModalOpen: PropTypes.bool,
  isConfirmOpen: PropTypes.bool,
  isUpdateError: PropTypes.bool,
  isCancelConfirmOpen: PropTypes.bool,
  rulesToShow: PropTypes.number,
  handleModalClose: PropTypes.func,
  onChangeRule: PropTypes.func,
  pagesToDisplay: PropTypes.number,
  currentPageIndex: PropTypes.number,
  handleEditClicked: PropTypes.func,
  handleConcurrentEditClicked: PropTypes.func,
  handleCancelSaveClicked: PropTypes.func,
  handleChangelogClicked: PropTypes.func,
  handleCancelConfirmation: PropTypes.func,
  handleSaveConfirmation: PropTypes.func,
  userCanEditRule: PropTypes.bool,
};

BounceRuleDetailed.defaultProps = {
  currentRule: {},
  newRule: {},
  selectedChange: {},
  changelog: [],
  isEditClicked: false,
  isChangeModalOpen: false,
  isConfirmOpen: false,
  isCancelConfirmOpen: false,
  isUpdateError: false,
  rulesToShow: 10,
  handleModalClose: () => {},
  onChangeRule: () => {},
  pagesToDisplay: 1,
  currentPageIndex: 1,
  handleEditClicked: () => {},
  handleConcurrentEditClicked: () => {},
  handleCancelSaveClicked: () => {},
  handleChangelogClicked: () => {},
  handleCancelConfirmation: () => {},
  handleSaveConfirmation: () => {},
  userCanEditRule: false,
};

export default BounceRuleDetailed;
