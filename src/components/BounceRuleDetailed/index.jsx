import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import Button from "@sendgrid/ui-components/button";
import { Link } from "react-router-dom";
import DetailsContainer, { DetailsContainerEditable } from "./Details";
import Changelog from "./Changelog";
import ModalDisplay from "./Modals";
import { Row } from "../Row";
import { Column } from "../Column";
import Header from "../Header";
import Pagination from "../Pagination";
import "./index.scss";

const BounceRuleDetailed = ({
  currentRule,
  newRule,
  isEditClicked,
  isChangeModalOpen,
  isConfirmOpen,
  isCancelConfirmOpen,
  handleModalConfirm,
  handleModalClose,
  onChangeRule,
  handleButtonClicked,
}) => {
  const { id } = currentRule;
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
          <Column className=" sg-right" width={4} offset={8}>
            <Button
              onClick={handleButtonClicked}
              id="cancelClicked"
              onKeyDown={handleButtonClicked}
              data-test="cancel-button"
              className="header-button cancel-button"
              type="secondary"
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={handleButtonClicked}
              id="saveClicked"
              onKeyDown={handleButtonClicked}
              data-test="save-button"
              className="header-button save-button"
              type="primary"
            >
              {"Save"}
            </Button>
          </Column>
        ) : (
          <Column
            className="details-button-column sg-right"
            width={1}
            offset={11}
          >
            <span>
              <Button
                onClick={handleButtonClicked}
                id="editClicked"
                onKeyDown={handleButtonClicked}
                data-test="edit-button"
                className="header-button edit-button"
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
            {isEditClicked ? (
              <DetailsContainerEditable
                data-test="detailed-container-editable"
                currentRule={currentRule}
                onChangeRule={onChangeRule}
                newRule={newRule}
              />
            ) : (
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
          />
        </Column>
      </Row>
      <Row>
        <Column width={4} offset={5}>
          <Pagination
            prevPageIndex={1}
            nextPageIndex={10}
            pageIndex={1}
            pageInterval={1}
            numRules={3}
            updatePageIndex={() => {}}
          />
        </Column>
      </Row>

      <ModalDisplay
        data-test="modal"
        isChangeModalOpen={isChangeModalOpen}
        isConfirmOpen={isConfirmOpen}
        isCancelConfirmOpen={isCancelConfirmOpen}
        currentRule={currentRule}
        handleModalClose={handleModalClose}
        handleModalConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default BounceRuleDetailed;
