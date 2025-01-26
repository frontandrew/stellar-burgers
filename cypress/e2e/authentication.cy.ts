/// <reference types="cypress" />

import { testParams } from '../constants'

describe('Application authentication', () => {
  it('should provide access to the profile page', () => {
    const { email, password, name } = testParams

    cy.intercept('POST', '**/login', { fixture: 'login'}).as('login')
    cy.intercept('GET', '**/ingredients', { success: false, data: [] })
    cy.intercept('GET', '**/user', { success: false })

    cy.visit('/login')

    cy.get('[data-test-id=email-input]').focus().type(email)
    cy.get('[data-test-id=password-input]').focus().type(password)
    cy.get('[data-test-id=login-submit]').click()

    cy.wait('@login')

    cy.get('[data-test-id=navigate-profile]').click()

    cy.get('[data-test-id=email-input]').should('have.value', email)
    cy.get('[data-test-id=name-input]').should('have.value', name)
  })
})
