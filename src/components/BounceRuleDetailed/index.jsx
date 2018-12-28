import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import Button from "@sendgrid/ui-components/button";
import { Link } from "react-router-dom";
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
  isEditClicked,
  isChangeModalOpen,
  isConfirmOpen,
  isCancelConfirmOpen,
  handleModalConfirm,
  handleModalClose,
  onChangeRule,
  handleButtonClicked,
  pagesToDisplay,
  pageIndex,
  pageInterval,
  numRules,
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
          <h1>
            {"Bounce Rule"} {id}
          </h1>
        </Column>
        {isEditClicked ? (
          <Column className="csv-button-col" width={4} offset={8}>
            <Button
              onClick={handleButtonClicked}
              id="cancelClicked"
              onKeyDown={handleButtonClicked}
              data-test="cancel-button"
              className="sg-button cancel-button sg-right"
              type="secondary"
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={handleButtonClicked}
              id="saveClicked"
              onKeyDown={handleButtonClicked}
              data-test="save-button"
              className="sg-button save-button"
              type="primary"
            >
              {"Save"}
            </Button>
          </Column>
        ) : (
          <Column className="details-button-column" width={1} offset={11}>
            <span>
              <Button
                onClick={handleButtonClicked}
                id="editClicked"
                onKeyDown={handleButtonClicked}
                data-test="edit-button"
                className="sg-button edit-button"
                type="primary"
              >
                {"Edit Rule"}
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
                newRule={newRule}
              />
            )}
            {!isEditClicked && (
              <DetailsContainer
                data-test="detailed-container"
                currentRule={currentRule}
                handleButtonClicked={handleButtonClicked}
              />
            )}
          </div>
        </Column>
      </Row>
      <Row className="changelog-container">
        <Column width={10} offset={2}>
          <Changelog
            data-test="changelog-container"
            handleButtonClicked={handleButtonClicked}
            changelog={changelog}
            isChangelogEmpty={isChangelogEmpty}
          />
        </Column>
      </Row>
<<<<<<< HEAD
      <Row>
        <Column width={4} offset={5}>
          <Pagination
<<<<<<< HEAD
            prevPageIndex={() => {}}
            nextPageIndex={() => {}}
            pageIndex={pageIndex}
            pageInterval={pageInterval}
            numRules={numRules}
=======
            prevPageIndex={1}
            nextPageIndex={10}
            pagesToDisplay={5}
            pageIndex={1}
            pageInterval={1}
            numRules={3}
>>>>>>> fix details pagination error
            updatePageIndex={() => {}}
            pagesToDisplay={pagesToDisplay}
          />
        </Column>
      </Row>
=======
      {!isChangelogEmpty && (
        <Row>
          <Column width={4} offset={5}>
            <Pagination
              prevPageIndex={1}
              nextPageIndex={10}
              pagesToDisplay={5}
              pageIndex={1}
              pageInterval={1}
              numRules={3}
              updatePageIndex={() => {}}
            />
          </Column>
        </Row>
      )}
>>>>>>> added empty changelog

      {isChangeModalOpen && (
        <ChangeModal
          data-test="change-modal"
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          handleModalConfirm={handleModalConfirm}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          data-test="confirm-modal"
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          handleModalConfirm={handleModalConfirm}
        />
      )}
      {isCancelConfirmOpen && (
        <CancelConfirmationModal
          data-test="cancel-confirm-modal"
          currentRule={currentRule}
          handleModalClose={handleModalClose}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default BounceRuleDetailed;
