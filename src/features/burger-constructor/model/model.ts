import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { genItemIndex } from 'utils'
import { apiSlice } from 'api'

import { Ingredient } from 'entities/ingredient'

import { ORDER_MIN_LENGTH } from './const'
import { BurgerConstructorIngredient, BurgerConstructorState } from './type'
import {
  addIngredient,
  calcTotal,
  changeIngredientPosition,
  checkIsReady,
  removeIngredient,
} from './utils'

export const initState: BurgerConstructorState = {
  ingredients: [],
  total: 0,
  isReady: false,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initState,
  selectors: { state: (state) => state },
  reducers: {
    addIngredient: {
      prepare: ({ item, ...rest }: { item: Ingredient, targId?: string }) => ({ payload: {
        item: { ...item, inBurgerConstructorIndex: genItemIndex() }, ...rest }
      }),
      reducer: (state, { payload }: PayloadAction<{ item: BurgerConstructorIngredient, targId?: string }>) => {
        state.ingredients = addIngredient(state.ingredients, payload.item, payload.targId)
        state.isReady = checkIsReady(state.ingredients, ORDER_MIN_LENGTH)
        state.total = calcTotal(state.ingredients)
      },
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = removeIngredient(state.ingredients, payload)
      state.isReady = checkIsReady(state.ingredients, ORDER_MIN_LENGTH)
      state.total = calcTotal(state.ingredients)
    },
    sortIngredients: (state, { payload }: PayloadAction<{ currId: string, targId: string }>) => {
      state.ingredients = changeIngredientPosition(state.ingredients, payload.currId, payload.targId)
    },
    resetConstructorState: () => initState,
  },
  extraReducers: builder => builder
    .addMatcher(apiSlice.endpoints.postOrder.matchFulfilled, (state, { payload }) => {
      state.orderNumber = payload.id
    }),
})
