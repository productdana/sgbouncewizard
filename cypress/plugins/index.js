const axios = require("axios");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// const mockAPI = "http://localhost:3004/";
const API = "http://localhost:3000/";
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    createRule: data =>
      axios
        .post(`${API}bounce_rules/`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(res => res.data)
        .catch(() => false),
    deleteRule: ruleId =>
      axios
        .delete(`${API}bounce_rules/${ruleId}`)
        .then(() => true)
        .catch(() => false),
    getRules: () =>
      axios
        .get(`${API}bounce_rules/`)
        .then(res => res.data)
        .catch(() => false),
  });
};
