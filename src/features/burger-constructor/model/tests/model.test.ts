import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'

import { burgerConstructorSlice, initState, ORDER_MIN_LENGTH } from '../'
import { ingredientsMock } from './mocks'
import { IngredientType } from 'entities/ingredient'

const { reducerPath, actions, reducer } = burgerConstructorSlice

describe('Burger Constructor state', () => {

  const store = configureStore({
    reducer: {
      [reducerPath]: reducer,
    },
  })

  test('should be equal with slice init state after create', () => {
    return expect(store.getState().burgerConstructor).toEqual(initState)
  })

  test('should not be change state on non-slice type actions', () => {
    store.dispatch({ type: 'some-type', payload: 'some-payload' })
    store.dispatch({ type: 'another-type' })

    return expect(store.getState().burgerConstructor).toEqual(initState)
  })

  describe(`on 'addIngredient' action`, () => {

    describe('should be contain in ingredients list', () => {
      const ingr = ingredientsMock[0]
      beforeAll(() => {
        store.dispatch(actions.resetConstructorState())
        store.dispatch(actions.addIngredient({ item: ingr }))
      })
      afterAll(() => {
        store.dispatch(actions.resetConstructorState())
      })

      test(`one more item in constructor 'ingredients'`, () => {
        return expect(store.getState().burgerConstructor.ingredients.length)
          .toEqual(initState.ingredients.length + 1)
      })
      test('item with id param from added item', () => {
        return expect(store.getState().burgerConstructor.ingredients[0].id).toEqual(ingr.id)
      })
      test('item with `in burger constructor id` param', () => {
        return expect(store.getState().burgerConstructor.ingredients[0])
          .toHaveProperty('inBurgerConstructorIndex')
      })
    })

    describe(`should increase 'total' param on`, () => {
      afterAll(() => {
        store.dispatch(actions.resetConstructorState())
      })

      test(`added ingredient price if his type is not '${IngredientType.BUN}'`, () => {
        const notBunTypeIngr = ingredientsMock.filter(({ type }) => type !== IngredientType.BUN)[0]
        store.dispatch(actions.addIngredient({ item: notBunTypeIngr }))

        return expect(store.getState().burgerConstructor.total).toEqual(notBunTypeIngr.price)
      })
      test(`added ingredient double price if his type is '${IngredientType.BUN}'`, () => {
        const bunTypeIngr = ingredientsMock.filter(({ type }) => type !== IngredientType.BUN)[0]
        store.dispatch(actions.addIngredient({ item: bunTypeIngr }))

        return expect(store.getState().burgerConstructor.total).toEqual(bunTypeIngr.price * 2)
      })
    })
  })

  describe(`on 'removeIngredient' action`, () => {
    afterAll(() => {
      store.dispatch(actions.resetConstructorState())
    })
    beforeEach(() => {
      store.dispatch(actions.resetConstructorState())
      ingredientsMock.forEach((ingredient) => {
        store.dispatch(actions.addIngredient({ item: ingredient }))
      })
    })

    test('should be remove passed item from ingredients list', () => {
      const removedItem = store.getState().burgerConstructor.ingredients[0]
      const beforeLength = store.getState().burgerConstructor.ingredients.length

      store.dispatch(actions.removeIngredient(removedItem.inBurgerConstructorIndex))

      const resultStateItem = store.getState().burgerConstructor.ingredients
        .find(({ inBurgerConstructorIndex: idx }) => removedItem.inBurgerConstructorIndex === idx)
      const resultStateLength = store.getState().burgerConstructor.ingredients.length - beforeLength

      expect(resultStateItem).toBeUndefined()
      expect(resultStateLength).toEqual(-1)
    })

    describe(`should be decrease 'total' param`, () => {
      test(`on removed ingredient price, if his type is not '${IngredientType.BUN}'`, () => {
        const removedNotBunTypeItem = store.getState().burgerConstructor.ingredients
          .filter(({ type }) => type !== IngredientType.BUN)[0]
        const beforeTotal = store.getState().burgerConstructor.total

        store.dispatch(actions.removeIngredient(removedNotBunTypeItem.inBurgerConstructorIndex))
        const difference = beforeTotal - store.getState().burgerConstructor.total

        expect(difference).toEqual(removedNotBunTypeItem.price)
      })
      test(`on removed ingredient double price, if his type is '${IngredientType.BUN}'`, () => {
        const removedBunTypeItem = store.getState().burgerConstructor.ingredients
          .filter(({ type }) => type === IngredientType.BUN)[0]
        const beforeTotal = store.getState().burgerConstructor.total

        store.dispatch(actions.removeIngredient(removedBunTypeItem.inBurgerConstructorIndex))
        const difference = beforeTotal - store.getState().burgerConstructor.total

        expect(difference).toEqual(removedBunTypeItem.price * 2)
      })
    })
  })

  describe(`on 'sortIngredients' action the movable element`, () => {
    beforeEach(() => {
      store.dispatch(actions.resetConstructorState())
      ingredientsMock.forEach((ingredient) => {
        store.dispatch(actions.addIngredient({ item: ingredient }))
      })
    })

    test('should be stands in front of the target one', () => {
      const currentOrder = store.getState().burgerConstructor.ingredients
      const movableItemId = currentOrder[currentOrder.length - 1].inBurgerConstructorIndex

      const targetItemInArrayIndex = 1
      const targetItemId = currentOrder[targetItemInArrayIndex].inBurgerConstructorIndex

      store.dispatch(actions.sortIngredients({ targId: targetItemId, currId: movableItemId }))

      expect(store.getState().burgerConstructor.ingredients[targetItemInArrayIndex].inBurgerConstructorIndex)
        .toEqual(movableItemId)
    })
  })

  describe(`should set 'isReady' param `, () => {
    afterEach(() => {
      store.dispatch(actions.resetConstructorState())
    })

    test(`to 'true' if constructor ingredients length more than '${ORDER_MIN_LENGTH}'`, () => {
      const ingrs = ingredientsMock.slice(0, ORDER_MIN_LENGTH + 1)
      ingrs.forEach((ingredient) => {
        store.dispatch(actions.addIngredient({ item: ingredient }))
      })

      expect(store.getState().burgerConstructor.isReady).true
    })
    test(`to 'true' if constructor ingredients length equal to '${ORDER_MIN_LENGTH}'`, () => {
      const ingrs = ingredientsMock.slice(0, ORDER_MIN_LENGTH)
      ingrs.forEach((ingredient) => {
        store.dispatch(actions.addIngredient({ item: ingredient }))
      })

      expect(store.getState().burgerConstructor.isReady).true
    })
    test(`to 'false' if constructor ingredients length less than '${ORDER_MIN_LENGTH}'`, () => {
      const ingrs = ingredientsMock.slice(0, ORDER_MIN_LENGTH - 1)
      ingrs.forEach((ingredient) => {
        store.dispatch(actions.addIngredient({ item: ingredient }))
      })

      expect(store.getState().burgerConstructor.isReady).false
    })
  })
})
