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

<<<<<<< HEAD
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
          <Column className=" sg-right" width={2} offset={10}>
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
=======
const BounceRuleDetailed = ({ currentRule }) => (
  <div
    className="row"
    style={{
      marginTop: "2rem",
      height: "100vh",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div
      style={{
        width: "50rem"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "black" }}>
          Log Out
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0"
        }}
      >
        <div
          style={{
            width: "20rem",
            fontSize: "2rem"
          }}
        >
          Bounce Rule Details
        </div>
        <button type="submit" className="btn btn-primary">
          Create a Bounce Rule
        </button>
      </div>
      <div
        style={{
          border: "1px solid black",
          padding: "1.5rem",
          margin: "2rem 0"
        }}
      >
        {currentRule.description}
      </div>
      <div>Changelog</div>
>>>>>>> fields update
    </div>
  );
};

export default BounceRuleDetailed;
