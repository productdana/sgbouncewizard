import React from "react";
import { Button } from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Select } from "@sendgrid/ui-components/select";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const ActivityFilter = ({
  searchToken,
  updateSearchToken,
  updateSearchCategory,
  filterOptions,
  addFilter,
  removeFilter,
  isValidFilter,
}) => (
  <div className="filter-wrap">
    <div className="filter-header">
      <p className="filter-title">
        {"Search activity by "}
        <a className="filter-option-toggle" href="#">
          all
        </a>
        {" of the following:"}
      </p>
      <div className="btn-list">
        <Button type="secondary" small>
          Clear Search
        </Button>
      </div>
    </div>
    <div className="filter-list">
      <Row>
        <Column width={3} offset={1}>
          <Select
            className="select-filter"
            onChange={updateSearchCategory}
            name="primary-filter"
            defaultValue={{ label: "Bounce Action", value: "Bounce Action" }}
            options={[
              { label: "Bounce Action", value: "Bounce Action" },
              { label: "Enhanced Code", value: "Enhanced Code" },
              { label: "Description", value: "description" },
            ]}
          />
        </Column>
        <Column width={9} offset={4}>
          <TextInput
            type="text"
            fullWidth
            label="Description"
            onChange={updateSearchToken}
            value={searchToken}
            isValid={isValidFilter}
            info={!isValidFilter && "Please enter a valid filter description."}
          />
        </Column>
        <i className="filter-row-remove sg-icon sg-icon-x" />
      </Row>

      <Row>
        <div className="row btn-list filter-actions-container">
          <Button type="primary" small onClick={addFilter}>
            Add a Filter
          </Button>
          {filterOptions.map(filterOption => (
            <Button
              type="secondary"
              small
              onClick={removeFilter}
              key={filterOption.searchCategory + filterOption.searchToken}
            >
              {filterOption.searchCategory} - {filterOption.searchToken}
            </Button>
          ))}
        </div>
      </Row>
    </div>
  </div>
);
export default ActivityFilter;
