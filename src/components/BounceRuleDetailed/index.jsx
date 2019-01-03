import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import Button from "@sendgrid/ui-components/button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DetailsContainer, { DetailsContainerEditable } from "./Details";
import Changelog from "./Changelog";
import ChangeModal from "./Modals/ChangeModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import CancelConfirmationModal from "./Modals/CancelConfirmationModal";
import { Row } from "../Row";
import { Column } from "../Column";
import Header from "../Header";
import Pagination from "../Pagination";
import "./index.scss";

const BounceRuleDetailed = ({
  currentRule,
  newRule,
  changelog,
  selectedChange,
  isEditClicked,
  isChangeModalOpen,
  isConfirmOpen,
  isCancelConfirmOpen,
  changelogLimit,
  handleModalClose,
  onChangeRule,
  pagesToDisplay,
  pageIndex,
  pageInterval,
  numRules,
  handleEditClicked,
  handleCancelSaveClicked,
  handleChangelogClicked,
  handleCancelConfirmation,
  handleSaveConfirmation,
  onChangeRuleInt,
}) => {
  const { id } = currentRule;
  const isChangelogEmpty = changelog === undefined || changelog.length < 1;
  return (
    <div className="detailed-page-container">
      <Header />
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
              data-test="cancel-button"
              className="sg-button cancel-button sg-right"
              type="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCancelSaveClicked}
              id="isConfirmOpen"
              onKeyDown={handleCancelSaveClicked}
              data-test="save-button"
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
                data-test="edit-button"
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
                data-test="detailed-container-editable"
                currentRule={currentRule}
                onChangeRule={onChangeRule}
                onChangeRuleInt={onChangeRuleInt}
                newRule={newRule}
              />
            )}
            {!isEditClicked && (
              <DetailsContainer
                data-test="detailed-container"
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
            data-test="changelog-container"
            changelogLimit={changelogLimit}
            handleChangelogClicked={handleChangelogClicked}
            changelog={changelog}
            isChangelogEmpty={isChangelogEmpty}
          />
        </Column>
      </Row>
      {!isChangelogEmpty && (
        <Row>
          <Column width={4} offset={5}>
            <Pagination
              prevPageIndex={1}
              nextPageIndex={10}
              pagesToDisplay={pagesToDisplay}
              pageIndex={pageIndex}
              pageInterval={pageInterval}
              numRules={numRules}
              updatePageIndex={() => {}}
            />
          </Column>
        </Row>
      )}
      {isChangeModalOpen && (
        <ChangeModal
          data-test="change-modal"
          currentRule={currentRule}
          selectedChange={selectedChange}
          handleModalClose={handleModalClose}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          data-test="confirm-modal"
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          onChangeRule={onChangeRule}
          handleSaveConfirmation={handleSaveConfirmation}
        />
      )}
      {isCancelConfirmOpen && (
        <CancelConfirmationModal
          data-test="cancel-confirm-modal"
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          handleCancelConfirmation={handleCancelConfirmation}
        />
      )}
    </div>
  );
};
BounceRuleDetailed.propTypes = {
  // currentRule: PropTypes.object,
  // newRule: PropTypes.object,
  // changelog: PropTypes.array,
  // selectedChange: PropTypes.object,
  isEditClicked: PropTypes.bool,
  isChangeModalOpen: PropTypes.bool,
  isConfirmOpen: PropTypes.bool,
  isCancelConfirmOpen: PropTypes.bool,
  changelogLimit: PropTypes.number,
  handleModalClose: PropTypes.func,
  onChangeRule: PropTypes.func,
  pagesToDisplay: PropTypes.number,
  pageIndex: PropTypes.number,
  pageInterval: PropTypes.number,
  numRules: PropTypes.number,
  handleEditClicked: PropTypes.func,
  handleCancelSaveClicked: PropTypes.func,
  handleChangelogClicked: PropTypes.func,
  handleCancelConfirmation: PropTypes.func,
  handleSaveConfirmation: PropTypes.func,
};

BounceRuleDetailed.defaultProps = {
  isEditClicked: false,
  isChangeModalOpen: false,
  isConfirmOpen: false,
  isCancelConfirmOpen: false,
  changelogLimit: 10,
  handleModalClose: () => {},
  onChangeRule: () => {},
  pagesToDisplay: 1,
  pageIndex: 1,
  pageInterval: 10,
  numRules: PropTypes.number,
  handleEditClicked: () => {},
  handleCancelSaveClicked: () => {},
  handleChangelogClicked: () => {},
  handleCancelConfirmation: () => {},
  handleSaveConfirmation: () => {},
};

BounceRuleDetailed.defaultProps = {};
export default BounceRuleDetailed;
