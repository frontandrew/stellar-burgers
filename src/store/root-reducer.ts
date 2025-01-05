import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { userSlice } from 'entities/user'

import { authSlice } from 'features/authentification'
import { appLoaderSlice } from 'features/app-loader'
import { burgerConstructorSlice } from 'features/burger-constructor'
import { ingredientsSlice } from 'features/burger-ingredients'

export const rootReducer = combineReducers({
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [appLoaderSlice.reducerPath]: appLoaderSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
})
