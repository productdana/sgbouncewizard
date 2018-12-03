import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Link } from "react-router-dom";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Row } from "../Row";
import { Column } from "../Column";
import Header from "../Header";
import Pagination from "../Pagination";
import "./index.scss";
import mockChangelog from "../../mocks/index";

const DetailContainer = ({ currentRule, handleButtonClicked }) => (
  <div
    onClick={() => handleButtonClicked("editClicked")}
    onKeyDown={() => handleButtonClicked("editClicked")}
    role="searchbox"
    tabIndex={0}
    className="detail-container card "
  >
    <div className="editable">
      <i className="sg-icon sg-icon-editor-design" />
    </div>
    <div className="description-info">
      <Table className="table-fixed">
        <TableBody>
          <TableRow>
            <TableCell className="description-cell">
              <strong>Description</strong>
            </TableCell>
            <TableCell> {currentRule.description} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div className="detail-info">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Bounce ID</strong>
            </TableCell>
            <TableCell> {currentRule.id} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Response Code</strong>
            </TableCell>
            <TableCell> {currentRule.response_code} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Enhanced Code</strong>
            </TableCell>
            <TableCell> {currentRule.enhanced_code} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Regex</strong>
            </TableCell>
            <TableCell> {currentRule.regex} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Priority</strong>
            </TableCell>
            <TableCell> {currentRule.priority} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Bounce Action</strong>
            </TableCell>
            <TableCell> {currentRule.bounce_action} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

const DetailContainerEditable = ({ currentRule, onChangeRule }) => (
  <div className="detail-container detail-container-editable card ">
    <div className="editable">
      <i className="sg-icon sg-icon-editor-design" />
    </div>
    <div className="description-info">
      <Table className="table-fixed">
        <TableBody>
          <TableRow>
            <TableCell className="description-cell">
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "description")}
                value={currentRule.description}
                type="text"
                label={currentRule.description}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div className="detail-info">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Bounce ID</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "id")}
                value={currentRule.id}
                type="text"
                label={currentRule.id}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Response Code</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "response_code")}
                value={currentRule.response_code}
                type="text"
                label={currentRule.response_code}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Enhanced Code</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "enhanced_code")}
                value={currentRule.enhanced_code}
                type="text"
                label={currentRule.enhanced_code}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Regex</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "regex")}
                value={currentRule.regex}
                type="text"
                label={currentRule.regex}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Priority</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "priority")}
                value={currentRule.priority}
                type="text"
                label={currentRule.priority}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Bounce Action</strong>
            </TableCell>
            <TableCell>
              <TextInput
                onChange={e => onChangeRule(e, "bounce_action")}
                value={currentRule.bounce_action}
                type="text"
                label={currentRule.bounce_action}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

const Changelog = ({ handleButtonClicked }) => (
  <div>
    <h2>Changelog</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>User</HeaderCell>
          <HeaderCell>Commit Message</HeaderCell>
          <HeaderCell className="actions-align">Actions</HeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockChangelog.map(change => (
          <ChangelogMin
            key={change.id}
            change={change}
            handleButtonClicked={handleButtonClicked}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

const ChangelogMin = ({ change, handleButtonClicked }) => (
  <TableRow>
    <TableCell>{change.date}</TableCell>
    <TableCell>{change.user}</TableCell>
    <TableCell>{change.message}</TableCell>
    <TableCell className="changelog-view-icon-cell">
      <i
        onClick={() => handleButtonClicked("changeClicked")}
        onKeyDown={() => handleButtonClicked("changeClicked")}
        className="sg-icon sg-icon-view changelog-view-icon"
        role="button"
        tabIndex={0}
      />
    </TableCell>
  </TableRow>
);

const ConfirmModalBody = ({
  isConfirmOpen,
  isCancelConfirmOpen,
  handleModalClose,
  handleModalConfirm,
}) => (
  <div>
    <Row>
      <Column>
        {(isConfirmOpen && (
          <div>
            <h2>Are you sure you&apos;d like to commit these changes?</h2>
            <p>
              {
                "Doing so will effect how current email will be handled via this\
              bounce rule. This action will go into effect immediately."
              }
            </p>
          </div>
        )) ||
          (isCancelConfirmOpen && (
            <div>
              <h2>Are you sure you want to discard these changes?</h2>
              <p>Doing so will remove applied changes.</p>
            </div>
          ))}
      </Column>
    </Row>
    <Row>
      <Column width={1} offset={10}>
        <Button
          className="sg-button"
          onClick={handleModalClose}
          type="secondary"
        >
          {"Close"}
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          className="sg-button"
          onClick={handleModalConfirm}
          type="primary"
        >
          {"Submit"}
        </Button>
      </Column>
    </Row>
  </div>
);

const ChangeModalBody = ({ currentRule, handleModalClose }) => (
  <div className="changelog-modal">
    <Row>
      <Column width={6} offset={1}>
        <h1>Current</h1>
        <ChangeTable currentRule={currentRule} />
      </Column>
      <Column width={6} offset={7}>
        <h1>Previous</h1>
        <ChangeTable currentRule={currentRule} />
      </Column>
    </Row>
    <Row>
      <Column className="changelog-modal-button sg-right" width={1} offset={12}>
        <Button onClick={handleModalClose}>Close</Button>
      </Column>
    </Row>
  </div>
);

const ChangeTable = ({ currentRule }) => (
  <Table className="change-table">
    <TableBody>
      <TableRow>
        <TableCell>
          <strong>ID</strong>
        </TableCell>
        <TableCell>{currentRule.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>Bounce Action</strong>
        </TableCell>
        <TableCell>{currentRule.bounce_action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>Response Code</strong>
        </TableCell>
        <TableCell>{currentRule.response_code}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>Enhanced Code</strong>
        </TableCell>
        <TableCell>{currentRule.enhanced_code}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>RegEx</strong>
        </TableCell>
        <TableCell>{currentRule.regex}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>Priority</strong>
        </TableCell>
        <TableCell>{currentRule.priority}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <strong>Description</strong>
        </TableCell>
        <TableCell>{currentRule.description}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

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
}) => (
  <div className="detailed-page-container">
    <Header />
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb>
          <Link to="/bounce_rules">Bounce Rules</Link>
          <Link to={`/bounce_rules/${currentRule.id}`}>{currentRule.id}</Link>
        </Breadcrumb>
      </Column>
    </Row>
    <Row>
      <Column width={6} offset={2}>
        <h1>
          {"Bounce Rule"} {currentRule.id}
        </h1>
      </Column>
      {isEditClicked ? (
        <Column className=" sg-right" width={4} offset={8}>
          <Button
            onClick={() => handleButtonClicked("cancelClicked")}
            onKeyDown={() => handleButtonClicked("cancelClicked")}
            data-test="cancel-button"
            className="header-button cancel-button"
            type="secondary"
          >
            {"Cancel"}
          </Button>
          <Button
            onClick={() => handleButtonClicked("saveClicked")}
            onKeyDown={() => handleButtonClicked("saveClicked")}
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
              onClick={() => handleButtonClicked("editClicked")}
              onKeyDown={() => handleButtonClicked("editClicked")}
              data-test="edit-button"
              className="header-button edit-button"
              type="primary"
            >
              {"Edit Rule"}
            </Button>
          </span>
        </Column>
      )}
      {/* </Column> */}
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <div>
          {isEditClicked ? (
            <DetailContainerEditable
              data-test="detailed-container-editable"
              currentRule={currentRule}
              onChangeRule={onChangeRule}
              newRule={newRule}
            />
          ) : (
            <DetailContainer
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

const ModalDisplay = ({
  isChangeModalOpen,
  isConfirmOpen,
  isCancelConfirmOpen,
  currentRule,
  handleModalClose,
  handleModalConfirm,
}) => (
  <CenterModal
    large={isChangeModalOpen}
    open={isChangeModalOpen || isConfirmOpen || isCancelConfirmOpen}
    renderBody={
      (isChangeModalOpen && (
        <ChangeModalBody
          handleModalClose={() => handleModalClose("changeModal")}
          currentRule={currentRule}
        />
      )) ||
      (isConfirmOpen && (
        <ConfirmModalBody
          isConfirmOpen={isConfirmOpen}
          handleModalClose={() => handleModalClose("saveModal")}
          handleModalConfirm={() => handleModalConfirm("saveModal")}
        />
      )) ||
      (isCancelConfirmOpen && (
        <ConfirmModalBody
          isCancelConfirmOpen={isCancelConfirmOpen}
          handleModalClose={() => handleModalClose("cancelModal")}
          currentRule={currentRule}
          handleModalConfirm={() => handleModalConfirm("cancelModal")}
        />
      ))
    }
  />
);

export default BounceRuleDetailed;
