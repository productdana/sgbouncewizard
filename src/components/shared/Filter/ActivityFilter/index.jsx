import React from "react";
import { Button } from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Select } from "@sendgrid/ui-components/select";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const selectOptions = filterBy => {
  if (filterBy === "bounce_action") {
    return [
      { label: "no_action", value: "no_action" },
      { label: "retry", value: "retry" },
      { label: "suppress", value: "suppress" },
      { label: "blocked", value: "blocked" },
    ];
  }
  if (filterBy === "operation") {
    return [
      { label: "Create", value: "create" },
      { label: "Update", value: "update" },
      { label: "Delete", value: "delete" },
    ];
  }
  return null;
};

const displayOptionInput = (
  filterBy,
  option,
  updateFilterOption,
  isValidFilter,
  handleOptionSelector
) => {
  if (filterBy === "bounce_action" || filterBy === "operation") {
    return (
      <div className="filter-select">
        <Select
          isRequired
          onChange={handleOptionSelector}
          placeholder="Select an Option"
          value={option && { label: option, value: option.toLowerCase() }}
          options={selectOptions(filterBy)}
        />
      </div>
    );
  }
  return (
    <TextInput
      type="text"
      fullWidth
      onChange={updateFilterOption}
      value={option}
      isValid={isValidFilter}
      info={!isValidFilter && "Please enter a valid filter description."}
    />
  );
};

const RuleFilter = ({
  filterQuery,
  updateFilterBy,
  updateFilterOption,
  isValidFilter,
  handleClearSearch,
  handleOptionSelector,
}) => {
  const { filterBy, option } = filterQuery;
  return (
    <div className="filter-wrap">
      <div className="filter-header">
        <p className="filter-title">
          {"Search bounce rules by "}
          <a className="filter-option-toggle" href="#">
            all
          </a>
          {" of the following:"}
        </p>
        <div className="btn-list">
          <Button type="secondary" onClick={handleClearSearch} small>
            Clear Search
          </Button>
        </div>
      </div>
      <div className="filter-list">
        <Row>
          <Column width={3} offset={1}>
            <Select
              className="select-filter"
              onChange={updateFilterBy}
              name="primary-filter"
              defaultValue={{ label: "Operation", value: "operation" }}
              options={[
                { label: "Operation", value: "operation" },
                { label: "Bounce Action", value: "bounce_action" },
                { label: "Enhanced Code", value: "enhanced_code" },
                { label: "Description", value: "description" },
                { label: "Comment", value: "comment" },
                { label: "Priority", value: "priority" },
                { label: "Response Code", value: "response_code" },
                { label: "Created At", value: "created_at" },
              ]}
            />
          </Column>
          <Column className="filter-column" width={9} offset={4}>
            {displayOptionInput(
              filterBy,
              option,
              updateFilterOption,
              isValidFilter,
              handleOptionSelector
            )}
          </Column>
          <i className="filter-row-remove sg-icon sg-icon-x" />
        </Row>
      </div>
    </div>
  );
};
export default RuleFilter;
