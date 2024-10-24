import { PropsWithChildren } from 'react'

import { Ingredient } from 'entities/ingredient'


interface Props {
  data: Ingredient
  count?: number
}

export type IngredientCardProps = PropsWithChildren<Props>
