import { PropsWithChildren } from 'react'

import { Ingredient } from 'entities/ingredient'

interface Props {
  category: string
  ingredients: Ingredient[]
}

export type IngredientsGroupProps = PropsWithChildren<Props>
