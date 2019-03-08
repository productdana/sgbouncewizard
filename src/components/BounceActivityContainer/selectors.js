import {
  selectSelectorGenerator,
  writeSelectorGenerator,
} from "../selectorHelpers";

// These test hooks will eventually turn into the following:
// - Selectors (CSS Selector strings) i.e. "[data-test=emailInput]"
// - Write Selectors (Selector objects spread onto React components) i.e. { data-test: "emailInput" }
// What if we had to update a data-test attribute value or other CSS selectors?
// - We would have to update all the test file strings in Jest/Enzyme and Cypress tests and React components.
// - This pattern helps us maintain this in the long run and update as few places as possible for CSS selector changes
const testHooks = {
  page: "activity-log-page",
  breadcrumb: "activity-log-breadcrumb",
  csvButton: "export-csv-button",
  activityFilter: "rule-filter",
  activityTable: "activity-table",
  emptyRulesWarning: "empty-rules-warning",
  pagination: "pagination",
  detailsModal: "actvity-details-modal",
};

// Selectors like "[data-test=emailInput]" to be imported into the following files:
// - Jest/Enzyme tests to be placed into .find("[data-test=emailInput]") and other similar functions
// - Cypress tests to be placed into cy.get("[data-test=emailInput]"), cy.contains(), etc.
const Selectors = selectSelectorGenerator(testHooks);

// Write Selectors like { emailInput: { data-test: "emailInput" }, ... } to be imported into
// React component files to spread the data-test attributes onto elements we would like to keep track of for tests
// i.e. <Component {...WriteSelectors.emailInput} /> => <Component data-test="emailInput" />
const WriteSelectors = writeSelectorGenerator(testHooks);

export { Selectors, WriteSelectors };
