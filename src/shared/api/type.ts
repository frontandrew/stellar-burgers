import { IngredientTypes } from 'entities/ingredient'

export type IngredientsResponse = {
  _id: string
  name: string
  type: IngredientTypes
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export type PostOrderResponse = {
  name: string
  order: {
     number: number
  }
}