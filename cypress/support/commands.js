// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add("getExist", (query, amount=1) => {
  cy.get(query).should("have.length", amount);
});

Cypress.Commands.add("containExist", (queryElement, queryContent, amount=1) => {
  cy.contains(queryElement, queryContent).should("have.length", amount);
});

Cypress.Commands.add("typeInputCheckValue", (query,value) => {
  cy.get(query).should("have.length", 1).type(value).should("have.value", value);
});
