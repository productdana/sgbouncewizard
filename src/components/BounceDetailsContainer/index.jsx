import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import Button from "@sendgrid/ui-components/button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row } from "../Row";
import { Column } from "../Column";
import Header from "../Header";
import Pagination from "../Pagination";
import DetailsContainer, { DetailsContainerEditable } from "./Details";
import Changelog from "./Changelog";
import ChangeModal from "./Modals/ChangeModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import CancelConfirmationModal from "./Modals/CancelConfirmationModal";
import RevertConfirmationModal from "./Modals/RevertConfirmationModal";
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
  handleCancelSaveClicked,
  handleChangelogClicked,
  handleRevertClicked,
  handleCancelConfirmation,
  handleSaveConfirmation,
  handleRevertConfirm,
  onChangeRuleRevert,
  newCommitMessage,
  onChangeRuleInt,
  pagesToDisplay,
  currentPageIndex,
  handleNextClicked,
  handlePrevClicked,
  updatePageIndex,
  filteredChangelog,
  logout,
}) => {
  const { id } = currentRule;
  const isChangelogEmpty = changelog === undefined || changelog.length < 1;
  return (
    <div>
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
        {isEditClicked ? (
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
        ) : (
          <Column className="details-button-column" width={1} offset={11}>
            <span>
              <Button
                onClick={handleEditClicked}
                id="isEditClicked"
                onKeyDown={handleEditClicked}
                {...WriteSelectors.editButton}
                className="sg-button edit-button"
                type="primary"
              >
                Edit Rule
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
        <RevertConfirmationModal
          currentRule={currentRule}
          selectedChange={selectedChange}
          handleModalClose={handleModalClose}
          handleRevertConfirm={handleRevertConfirm}
          onChangeRuleRevert={onChangeRuleRevert}
          newCommitMessage={newCommitMessage}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          {...WriteSelectors.saveConfirmationModal}
          updatedRule={updatedRule}
          handleModalClose={handleModalClose}
          onChangeRule={onChangeRule}
          handleSaveConfirmation={handleSaveConfirmation}
          isUpdateError={isUpdateError}
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
  handleCancelSaveClicked: PropTypes.func,
  handleChangelogClicked: PropTypes.func,
  handleCancelConfirmation: PropTypes.func,
  handleSaveConfirmation: PropTypes.func,
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
  handleCancelSaveClicked: () => {},
  handleChangelogClicked: () => {},
  handleCancelConfirmation: () => {},
  handleSaveConfirmation: () => {},
};

export default BounceRuleDetailed;
