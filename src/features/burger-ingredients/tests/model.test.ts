import { describe, expect, test } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'

import { ingredientsSlice, initState } from '../'
import { ingredientsMock } from './mocks'
import { Ingredient, IngredientType } from 'entities/ingredient'

const { reducerPath, reducer, actions } = ingredientsSlice
const setIngredientsAction = (agr: Ingredient[]) => ({
    meta: { arg: { endpointName: 'getIngredients' } },
    type: 'appApi/executeQuery/fulfilled',
    payload: agr,
  })

describe('Ingredients state', () => {
  const store = configureStore({ reducer: { [reducerPath]: reducer } })

  test('should be equal with slice init state after create', () => {
    expect(store.getState().ingredients).toEqual(initState)
  })
  test('should not be change state on non-slice type actions', () => {
    store.dispatch({ type: 'some-type', payload: 'some-payload' })
    store.dispatch({ type: 'another-type' })

    expect(store.getState().ingredients).toEqual(initState)
  })
  test(`should be filled with ingredients on 'getIngredients/fulfilled' action`, () => {
    store.dispatch(setIngredientsAction(ingredientsMock))

    expect(store.getState().ingredients).toHaveLength(ingredientsMock.length)
  })

  describe(`should be increase ingredient count on 'burgerConstructor/addIngredient' action`, () => {
    test(`by 2 if ingredient type is '${IngredientType.BUN}'`, () => {
      const bunTypeIngredient = store.getState().ingredients
        .filter(({ type }) => type === IngredientType.BUN)[0]

      store.dispatch(actions.increaseItemCount(bunTypeIngredient.id))

      const result = store.getState().ingredients.find(({ id }) => id === bunTypeIngredient.id)
      expect(result?.count).toEqual(2)
    })
    test(`by 1 if ingredient type is not '${IngredientType.BUN}'`, () => {
      const notBunTypeIngredient = store.getState().ingredients
        .filter(({ type }) => type !== IngredientType.BUN)[0]

      store.dispatch(actions.increaseItemCount(notBunTypeIngredient.id))

      const result = store.getState().ingredients.find(({ id }) => id === notBunTypeIngredient.id)
      expect(result?.count).toEqual(1)
    })
  })

  describe(`should be decrease ingredient count on 'burgerConstructor/removeIngredient' action`, () => {
    test(`by 2 if ingredient type is '${IngredientType.BUN}'`, () => {
      const bunTypeIngredient = store.getState().ingredients
        .filter(({ type, count }) => type === IngredientType.BUN && count === 2)[0]

      store.dispatch(actions.decreaseItemCount(bunTypeIngredient.id))

      const result = store.getState().ingredients.find(({ id }) => id === bunTypeIngredient.id)
      expect(result?.count).toBeUndefined()
    })
    test(`by 1 if ingredient type is not '${IngredientType.BUN}'`, () => {
      const notBunTypeIngredient = store.getState().ingredients
        .filter(({ type, count }) => type !== IngredientType.BUN && count === 1)[0]

      store.dispatch(actions.decreaseItemCount(notBunTypeIngredient.id))

      const result = store.getState().ingredients.find(({ id }) => id === notBunTypeIngredient.id)
      expect(result?.count).toBeUndefined()
    })
  })

  test(`should be reset all ingredients counts to undefined on 'burgerConstructor/resetConstructorState' action`, () => {
    store.dispatch(actions.resetAllItemsCount())

    const result = store.getState().ingredients.some(({ count }) => count)
    expect(result).toBeFalsy()
  })
})
