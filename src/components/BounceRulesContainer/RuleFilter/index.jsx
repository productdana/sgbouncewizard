import React from "react";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Select } from "@sendgrid/ui-components/select";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const RuleFilter = ({
  searchToken,
  updateSearchToken,
  updateSearchCategory,
  filterOptions,
  addFilter,
  removeFilter,
  invalidFilter,
}) => (
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
        <button type="button" className="btn btn-small btn-secondary">
          Clear Search
        </button>
      </div>
    </div>
    <div className="filter-list">
      <Row>
        <Column width={3} offset={1}>
          <div style={{ paddingTop: "15px" }} />
          <Select
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
            isValid={!invalidFilter}
            info={invalidFilter && "Please enter a valid filter description."}
          />
        </Column>
        <i className="filter-row-remove sg-icon sg-icon-x" />
      </Row>

      <Row>
        <div className="row btn-list filter-actions-container">
          <button
            type="button"
            onClick={addFilter}
            className="btn btn-small btn-secondary"
          >
            Add a Filter
          </button>
          {filterOptions.map(filterOption => (
            <button
              type="button"
              className="btn btn-small btn-secodary"
              onClick={removeFilter}
              key={JSON.stringify(filterOption)}
            >
              {filterOption.searchCategory} - {filterOption.searchToken}
            </button>
          ))}
        </div>
      </Row>
    </div>
  </div>
);
export default RuleFilter;
