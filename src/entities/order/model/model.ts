import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { genItemIndex } from 'utils'
import { apiSlice } from 'api'

import { Order, OrderIngredientItem } from '../type'

import {
  addIngredientIntoOrder,
  calcOrderTotal,
  changeIngredientPosition,
  checkOrderIsReady,
  removeIngredientFromOrder,
} from './utils'
import { ORDER_MIN_LENGTH } from './const'
import { Ingredient } from 'entities/ingredient'

const initState: Order = {
  id: null,
  ingredients: [],
  status: 'draft',
  total: 0,
  isReady: false,
  isLoading: false,
  error: null,
}

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState: initState,
  selectors: { order: (state) => state },
  reducers: {
    createNewOrder: {
      prepare: (payload: Ingredient) => ({ payload: {
        ...payload, orderIngredientIndex: genItemIndex()
      }}),
      reducer: (state, { payload }: PayloadAction<OrderIngredientItem>) => {
        state.ingredients = addIngredientIntoOrder(state.ingredients, payload)
        state.total = calcOrderTotal(state.ingredients)
      },
    },
    addOrderIngredient: {
      prepare: ({ item, ...rest }: { item: OrderIngredientItem, targId?: string }) => ({ payload: {
        item: {...item, orderIngredientIndex: genItemIndex()}, ...rest }
      }),
      reducer: (state, { payload }: PayloadAction<{ item: OrderIngredientItem, targId?: string }>) => {
        state.ingredients = addIngredientIntoOrder(state.ingredients, payload.item, payload.targId)
        state.isReady = checkOrderIsReady(state.ingredients, ORDER_MIN_LENGTH)
        state.total = calcOrderTotal(state.ingredients)
      },
    },
    removeOrderIngredient: (state, { payload }: PayloadAction<{ orderId: string, ingrId: string }>) => {
      state.ingredients = removeIngredientFromOrder(state.ingredients, payload.orderId)
      state.isReady = checkOrderIsReady(state.ingredients, ORDER_MIN_LENGTH)
      state.total = calcOrderTotal(state.ingredients)
    },
    sortOrderIngredients: (state, { payload }: PayloadAction<{currId: string, targId: string}>) => {
      state.ingredients = changeIngredientPosition(state.ingredients, payload.currId, payload.targId)
    },
    resetOrderState: () => initState,
  },
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.postOrder.matchPending, (state) => {
      return { ...state, isLoading: true, error: null, status: 'created' }
    })
    .addMatcher(apiSlice.endpoints.postOrder.matchRejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error ?? null, status: 'rejected' }
    })
    .addMatcher(apiSlice.endpoints.postOrder.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload, isLoading: false, status: 'inprogress', date: Date.now() }
    }),
})
