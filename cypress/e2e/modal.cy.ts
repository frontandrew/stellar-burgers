/// <reference types="cypress" />

describe('Modal', () => {
  beforeEach(() => {
    cy.intercept('**/ingredients', { fixture: 'ingredients' }).as('ingredients')
    cy.intercept('**/user', { fixture: 'user' }).as('user')

    cy.visit('/').wait('@user').wait('@ingredients')

    cy.get('[data-test-id=modal]').should('not.be.visible')
    cy.get('[data-test-id=ingredient-card-main]').first().click()
    cy.get('[data-test-id=modal]').filter(`:contains('Детали ингредиента')`).as('targetModal')
  })

  describe(`on trigger 'open' event`, () => {
    it('should become visible', () => {
      cy.get('@targetModal').should('be.visible')
    })

    it('should contain triggers data', () => {
      cy.fixture('ingredients').then(function (ingredients) {
        const ingr = ingredients.data.find(({ type }) => type === 'main')

        cy.get('@targetModal')
          .within(() => {
            cy.get('img').should('have.attr', 'src', ingr.image_large)
          })
          .should('contain', ingr.name)
          .and('contain', ingr.calories)
          .and('contain', ingr.carbohydrates)
          .and('contain', ingr.proteins)
          .and('contain', ingr.fat)
      })
    })
  })

  describe(`on trigger 'close' event`, () => {
    it('by click on modal overlay should close', () => {
      cy.get('@targetModal').parent().click(5, 5)
      cy.get('@targetModal').should('not.exist')
    })

    it('by click on modal leave button should close ', () => {
      cy.get('@targetModal').within(() => {
        cy.get('[data-test-id=modal-leave-button]').click()
      })
      cy.get('@targetModal').should('not.exist')
    })

    it('by press on Escape key should close', () => {
      cy.document().trigger('keyup', { key: 'Escape' })
      cy.get('@targetModal').should('not.exist')
    })
  })
})


