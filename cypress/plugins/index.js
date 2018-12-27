const fetch = require("node-fetch");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const mockAPI = "http://localhost:3004/";
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    createRule: data =>
      fetch(`${mockAPI}bounce_rules/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .catch(err => err),
    deleteRule: ruleId =>
      fetch(`${mockAPI}bounce_rules/${ruleId}`, { method: "DELETE" })
        .then(res => res)
        .catch(err => err),
    getRules: () =>
      fetch(`${mockAPI}bounce_rules`)
        .then(res => res.json())
        .catch(err => err),
  });
};
