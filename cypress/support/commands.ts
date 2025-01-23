// For more info https://on.cypress.io/custom-commands

/// <reference types="cypress" />

Cypress.Commands.add('loginUser', (email: string, password: string) => {

  cy.clearAllLocalStorage()
  cy.intercept('POST', '**/login', { fixture: 'login'}).as('login')
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients'}).as('ingredients')
  cy.intercept('GET', '**/user', { success: false }).as('user')

  cy.wait('@user')
  cy.wait('@ingredients')

  cy.visit('/login')

  cy.get('[data-test-id=email-input]').focus().type(email)
  cy.get('[data-test-id=password-input]').focus().type(password)
  cy.get('[data-test-id=login-submit]').click()

  cy.wait('@login')
})
