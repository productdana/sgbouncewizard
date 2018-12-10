export default class Page {
  timeout = 60000;

  open(path, options = {}) {
    // You can later chain this with .then if you'd like
    return cy.visit(`/${path}`, { timeout: this.timeout, ...options });
  }
}
