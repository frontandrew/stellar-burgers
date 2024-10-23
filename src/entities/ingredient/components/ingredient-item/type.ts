import { PropsWithChildren } from 'react'

import { Ingredient } from 'entities/ingredient'


interface Props {
  ingredient: Ingredient
  isLocked?: boolean
  type?: 'top' | 'bottom'
}

export type IngredientItemProps = PropsWithChildren<Props>
