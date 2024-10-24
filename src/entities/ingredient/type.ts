export type IngredientTypes = 'main' | 'sauce' | 'bun'

export enum IngredientType {
  'bun',
  'sauce',
  'main',
}

export interface Ingredient {
  id: string,
  name: string,
  type: IngredientTypes,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  imageMobile: string,
  imageLarge: string,
}
