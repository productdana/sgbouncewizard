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
const environmentAPI = {
  mock: "http://localhost:3004/",
  localhost: "http://localhost:3000/",
};
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = on => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    createRule: taskData =>
      axios
        .post(`${environmentAPI[taskData.env]}bounce_rules/`, taskData.data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(res => res.data)
        .catch(e => e),
    deleteRule: taskData =>
      axios
        .delete(
          `${environmentAPI[taskData.env]}bounce_rules/${taskData.data.id}`,
          {
            data: taskData.data,
          }
        )
        .then(() => true)
        .catch(() => false),
    getRules: taskData =>
      axios
        .get(`${environmentAPI[taskData.env]}bounce_rules/`)
        .then(res => res.data)
        .catch(() => false),
  });
};
