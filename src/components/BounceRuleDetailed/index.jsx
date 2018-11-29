import React from "react";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Button from "@sendgrid/ui-components/button";
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

const mockChangelog = [
  {
    id: "1",
    date: "11.07.2018",
    user: "Cody",
    message: "Fixed another another typo in the description",
  },
  {
    id: "2",
    date: "11.06.2018",
    user: "Joseph",
    message: "Fixed another typo in the description",
  },
  {
    id: "3",
    date: "11.05.2018",
    user: "Kristen",
    message: "Fixed a typo in the description",
  },
  {
    id: "4",
    date: "11.04.2018",
    user: "Greg",
    message: "Fixed a typo in the description",
  },
  {
    id: "5",
    date: "11.03.2018",
    user: "Khuong",
    message: "Fixed a typo in the description",
  },
  {
    id: "6",
    date: "11.07.2018",
    user: "Cody",
    message: "Fixed another another typo in the description",
  },
  {
    id: "7",
    date: "11.06.2018",
    user: "Joseph",
    message: "Fixed another typo in the description",
  },
  {
    id: "8",
    date: "11.05.2018",
    user: "Kristen",
    message: "Fixed a typo in the description",
  },
  {
    id: "9",
    date: "11.04.2018",
    user: "Greg",
    message: "Fixed a typo in the description",
  },
  {
    id: "10",
    date: "11.03.2018",
    user: "Khuong",
    message: "Fixed a typo in the description",
  },
];

const DetailContainer = ({ currentRule }) => (
  <div className="detail-container card ">
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

const Changelog = ({ openModal }) => (
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
          <ChangelogMin key={change.id} change={change} openModal={openModal} />
        ))}
      </TableBody>
    </Table>
  </div>
);

const ChangelogMin = ({ change, openModal }) => (
  <TableRow>
    <TableCell>{change.date}</TableCell>
    <TableCell>{change.user}</TableCell>
    <TableCell>{change.message}</TableCell>
    <TableCell className="changelog-view-icon-cell">
      <i
        onClick={openModal}
        onKeyDown={openModal}
        className="sg-icon sg-icon-view changelog-view-icon"
        role="button"
        tabIndex={0}
      />
    </TableCell>
  </TableRow>
);

const ViewChangeModal = ({ currentRule, isModalOpen, closeModal }) => (
  <CenterModal
    large
    open={isModalOpen}
    renderBody={<ModalBody closeModal={closeModal} currentRule={currentRule} />}
    data-role="example"
  />
);

const ModalBody = ({ currentRule, closeModal }) => (
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
      <Column className="sg-right" width={1} offset={12}>
        <Button onClick={closeModal}>Close</Button>
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
  isModalOpen,
  openModal,
  closeModal,
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
        <h1>Bounce Rule {currentRule.id}</h1>
      </Column>
      <Column className="details-button-column sg-right" width={2} offset={10}>
        <Button
          data-test="back-button"
          className="header-button back-button"
          type="secondary"
        >
          <Link to="/bounce_rules">Back</Link>
        </Button>
        <Button
          data-test="edit-button"
          className="header-button edit-button"
          type="primary"
        >
          Edit
        </Button>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <DetailContainer currentRule={currentRule} />
      </Column>
    </Row>
    <Row className="changelog-container">
      <Column width={10} offset={2}>
        <Changelog openModal={openModal} />
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
    <ViewChangeModal
      currentRule={currentRule}
      openModal={openModal}
      closeModal={closeModal}
      isModalOpen={isModalOpen}
    />
  </div>
);

export default BounceRuleDetailed;
