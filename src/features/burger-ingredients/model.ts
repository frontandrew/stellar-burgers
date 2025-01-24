import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { Ingredient, IngredientType } from 'entities/ingredient'

export const initState: Ingredient[] = []

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initState,
  selectors: { getState: (state) => state },
  reducers: {
    decreaseItemCount: (state, { payload }: PayloadAction<string>) => state.map((item) => {
      if (item.id === payload) {
        const { type, count } = item
        const nextCount = type !== IngredientType.BUN && count ? count - 1 : undefined
        return { ...item, count: nextCount }
      }

      return item
    }),
    increaseItemCount: (state, { payload }: PayloadAction<string>) => state.map((item) => {
        if (item.id === payload) {
          const { type, count } = item
          const nextCount = type !== IngredientType.BUN ? count ? count + 1 : 1 : 2
          return { ...item, count: nextCount }
        }

        return item
      }),
    resetAllItemsCount: (state) => state.map((item) => ({ ...item, count: undefined })),
  },
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.getIngredients.matchFulfilled, (_state, { payload }) => payload),
})

export const selectIngredientsByIds = createSelector(
  [ingredientsSlice.selectors.getState, (_, ids: string[]) => ids],
  (state, index: string[]) => index.map((idx) => state.find(({ id }) => id === idx)),
)
