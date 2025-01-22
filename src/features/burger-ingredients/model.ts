import { createSelector, createSlice } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { Ingredient, IngredientType } from 'entities/ingredient'
import { burgerConstructorSlice } from 'features/burger-constructor'

const { addIngredient, removeIngredient, resetConstructorState } = burgerConstructorSlice.actions

const initState: Ingredient[] = []

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initState,
  selectors: { getState: (state) => state },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(removeIngredient, (state, { payload }) => state
      .map((item) => item.id === payload
        ? { ...item, count: undefined }
        : item,
      ),
    )
    .addCase(addIngredient, (state, { payload }) => state
      .map((item) => {
        if (item.id === payload.item.id) {
          const nextCount = payload.item.type === IngredientType.BUN ? 2 : 1

          return { ...item, count: typeof item.count === 'number'
            ? item.count + nextCount
            : nextCount
          }
        }

        return item
      })
    )
    .addCase(resetConstructorState, (state) => state
      .map((item) => ({ ...item, count: undefined })),
    )

    .addMatcher(apiSlice.endpoints.getIngredients.matchFulfilled, (_state, { payload }) => payload),
})

export const selectIngredientsByIds = createSelector(
  [ingredientsSlice.selectors.getState, (_, ids: string[]) => ids],
  (state, index: string[]) => index.map((idx) => state.find(({ id }) => id === idx)),
);
