/// <reference types="cypress" />

describe('Burger Constructor feature view', () => {
  beforeEach(() => {
    cy.intercept('**/ingredients', { fixture: 'ingredients' }).as('ingredients')
    cy.intercept('**/user', { fixture: 'user' }).as('user')

    cy.visit('/').wait('@user').wait('@ingredients')

    cy.get('[data-test-id=constructor-item]').as('constructorItemsList')
    cy.get('@constructorItemsList').first().as('constructorItemTop')
    cy.get('@constructorItemsList').eq(1).as('constructorItemMiddle')
    cy.get('@constructorItemsList').last().as('constructorItemBottom')
  })

  describe('on drop bun type ingredient', () => {
    describe('should place it on a top and on a bottom sides of items list', () => {
      it('if top and bottom items are not contain other ingredients', () => {

        cy.fixture('ingredients').then(function (ingredients) {
          const [bunIngr] = ingredients.data.filter(({ type }) => type === 'bun')

          cy.get('@constructorItemsList').should('not.contain', bunIngr.name)

          cy.get('[data-test-id=ingredient-card-bun]')
            .contains(bunIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemTop').trigger('drop')

          cy.get('@constructorItemTop').should('contain', bunIngr.name)
          cy.get('@constructorItemBottom').should('contain', bunIngr.name)
        })
      })

      it('and replace they content, if top and bottom items are contain other ingredients', () => {

        cy.fixture('ingredients').then(function (ingredients) {
          const [firstBunIngr, secondBunIngr] = ingredients.data.filter(({ type }) => type === 'bun')

          cy.get('[data-test-id=ingredient-card-bun]')
            .contains(firstBunIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemTop').trigger('drop')

          cy.get('@constructorItemTop').should('contain', firstBunIngr.name)
          cy.get('@constructorItemBottom').should('contain', firstBunIngr.name)

          cy.get('[data-test-id=ingredient-card-bun]')
            .contains(secondBunIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemBottom').trigger('drop')

          cy.get('@constructorItemTop').should('contain', secondBunIngr.name)
          cy.get('@constructorItemBottom').should('contain', secondBunIngr.name)
        })
      })
    })

    describe('should not place it in items list', () => {
      it('if it dropped in the middle of constructor', () => {
        cy.fixture('ingredients').then(function (ingredients) {
          const [bunIngr] = ingredients.data.filter(({ type }) => type === 'bun')

          cy.get('@constructorItemsList').should('not.contain', bunIngr.name)

          cy.get('[data-test-id=ingredient-card-bun]')
            .contains(bunIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemMiddle').trigger('drop')

          cy.get('@constructorItemsList').should('not.contain', bunIngr.name)
        })
      })
    })
  })

  describe('on drop non bun type ingredient', () => {
    describe('should place it', () => {
      it('in a middle of items list, if middle position is not occupied', () => {
        cy.fixture('ingredients').then(function (ingredients) {
          const [ingr] = ingredients.data.filter(({ type }) => type === 'main')

          cy.get('@constructorItemsList').should('not.contain', ingr.name)

          cy.get('[data-test-id=ingredient-card-main]')
            .contains(ingr.name)
            .trigger('dragstart')
          cy.get('@constructorItemMiddle').trigger('drop')

          cy.get('@constructorItemMiddle').should('contain', ingr.name)
        })
      })

      it('in a middle of items list and before item, witch occupied middle position', () => {
        cy.fixture('ingredients').then(function (ingredients) {
          const [mainIngr, sauceIngr] = [
            ingredients.data.find(({ type }) => type === 'main'),
            ingredients.data.find(({ type }) => type === 'sauce'),
          ]

          cy.get('@constructorItemsList').should('not.contain', mainIngr.name)

          cy.get('[data-test-id=ingredient-card-main]')
            .contains(mainIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemMiddle').trigger('drop')

          cy.get('@constructorItemMiddle').should('contain', mainIngr.name)
          cy.get('@constructorItemsList').should('not.contain', sauceIngr.name)

          cy.get('[data-test-id=ingredient-card-sauce]')
            .contains(sauceIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemMiddle').trigger('drop')

          cy.get('@constructorItemMiddle').should('contain', sauceIngr.name)
        })
      })
    })

    describe('should not place it in items list', () => {
      it('if dropped on the top or on the bottom of constructor', () => {
        cy.fixture('ingredients').then(function (ingredients) {
          const [mainIngr, sauceIngr] = [
            ingredients.data.find(({ type }) => type === 'main'),
            ingredients.data.find(({ type }) => type === 'sauce'),
          ]

          cy.get('@constructorItemsList').should('not.contain', mainIngr.name)

          cy.get('[data-test-id=ingredient-card-main]')
            .contains(mainIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemTop').trigger('drop')

          cy.get('@constructorItemsList').should('not.contain', mainIngr.name)
          cy.get('@constructorItemsList').should('not.contain', sauceIngr.name)

          cy.get('[data-test-id=ingredient-card-sauce]')
            .contains(sauceIngr.name)
            .trigger('dragstart')
          cy.get('@constructorItemBottom').trigger('drop')

          cy.get('@constructorItemsList').should('not.contain', sauceIngr.name)
        })
      })
    })
  })
})
