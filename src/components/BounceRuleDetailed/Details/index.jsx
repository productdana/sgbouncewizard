import React from "react";
import { TextInput } from "@sendgrid/ui-components/text-input";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@sendgrid/ui-components/table/table";

const DetailsContainer = ({ currentRule, handleButtonClicked }) => {
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
      onClick={handleButtonClicked}
      id="editClicked"
      onKeyDown={handleButtonClicked}
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
              <TableCell> {description} </TableCell>
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
              <TableCell> {id} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Response Code</strong>
              </TableCell>
              <TableCell> {responseCode} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Enhanced Code</strong>
              </TableCell>
              <TableCell> {enhancedCode} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Regex</strong>
              </TableCell>
              <TableCell> {regex} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell> {priority} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Bounce Action</strong>
              </TableCell>
              <TableCell> {bounceAction} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const DetailsContainerEditable = ({ currentRule, onChangeRule }) => {
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
                  onChange={onChangeRule}
                  id="description"
                  value={description}
                  type="text"
                  label={description}
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
                  onChange={onChangeRule}
                  id="id"
                  value={id}
                  type="text"
                  label={id}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Response Code</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  onChange={onChangeRule}
                  id="response_code"
                  value={responseCode}
                  type="text"
                  label={responseCode}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Enhanced Code</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  onChange={onChangeRule}
                  id="enhanced_code"
                  value={enhancedCode}
                  type="text"
                  label={enhancedCode}
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
                  onChange={onChangeRule}
                  id="regex"
                  value={regex}
                  type="text"
                  label={regex}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  onChange={onChangeRule}
                  id="priority"
                  value={priority}
                  type="text"
                  label={priority}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Bounce Action</strong>
              </TableCell>
              <TableCell>
                <TextInput
                  onChange={onChangeRule}
                  id="bounce_action"
                  value={bounceAction}
                  type="text"
                  label={bounceAction}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetailsContainer;
