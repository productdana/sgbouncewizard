import React from "react";
import { TextInput } from "@sendgrid/ui-components/text-input";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import { Select } from "@sendgrid/ui-components/select";
import { shouldDisplay } from "../../../utils/utils";
import "./index.scss";
import { WriteSelectors } from "../selectors";

const DetailsContainer = ({ currentRule, handleEditClicked }) => {
  const {
    description,
    id,
    response_code: responseCode,
    enhanced_code: enhancedCode,
    bounce_action: bounceAction,
    regex,
    priority,
  } = currentRule;
  return (
    <div
      {...WriteSelectors.details}
      onClick={handleEditClicked}
      id="isEditClicked"
      onKeyDown={handleEditClicked}
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
              <TableCell> {shouldDisplay(description)} </TableCell>
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
              <TableCell> {shouldDisplay(id)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Response Code</strong>
              </TableCell>
              <TableCell> {shouldDisplay(responseCode)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Enhanced Code</strong>
              </TableCell>
              <TableCell> {shouldDisplay(enhancedCode)} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="detail-info">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Regex</strong>
              </TableCell>
              <TableCell> {shouldDisplay(regex)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell> {shouldDisplay(priority)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Bounce Action</strong>
              </TableCell>
              <TableCell> {shouldDisplay(bounceAction)} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const DetailsContainerEditable = ({
  onChangeRule,
  onChangeRuleInt,
  updatedRule,
  handleDropdownSelect,
}) => {
  const {
    description,
    id,
    response_code: responseCode,
    enhanced_code: enhancedCode,
    bounce_action: bounceAction,
    regex,
    priority,
  } = updatedRule;
  return (
    <div
      className="detail-container detail-container-editable card "
      {...WriteSelectors.detailsEditable}
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
              <TableCell>
                <TextInput
                  {...WriteSelectors.description}
                  onChange={onChangeRule}
                  id="description"
                  value={description}
                  type="text"
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
                <div className="uneditable">
                  <strong>{id}</strong>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Response Code</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  {...WriteSelectors.responseCode}
                  onChange={onChangeRuleInt}
                  id="response_code"
                  value={responseCode}
                  type="number"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Enhanced Code</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  {...WriteSelectors.enhancedCode}
                  onChange={onChangeRule}
                  id="enhanced_code"
                  value={enhancedCode}
                  type="text"
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
                <strong>Regex</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  {...WriteSelectors.regex}
                  onChange={onChangeRule}
                  id="regex"
                  value={regex}
                  type="text"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  {...WriteSelectors.priority}
                  onChange={onChangeRuleInt}
                  id="priority"
                  value={priority}
                  type="number"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Bounce Action</strong>
              </TableCell>
              <TableCell>
                <div className="bounce-action-select">
                  <Select
                    isRequired
                    value={{ label: bounceAction, value: bounceAction }}
                    options={[
                      { label: "no_action", value: "no_action" },
                      { label: "retry", value: "retry" },
                      { label: "suppress", value: "suppress" },
                      { label: "retry", value: "retry" },
                      { label: "blocked", value: "blocked" },
                    ]}
                    onChange={handleDropdownSelect}
                    id="bounce_action"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetailsContainer;
