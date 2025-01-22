import { PropsWithChildren } from 'react'
import { Ingredient, IngredientType } from 'entities/ingredient'

import { BurgerConstructorIngredient } from '../../model'

interface Props {
  ingredient?: BurgerConstructorIngredient
  position?: 'top' | 'bottom'
  expectType: IngredientType.BUN | 'other'
}

export type BurgerConstructorItemProps = PropsWithChildren<Props>
export type DropItemType = BurgerConstructorIngredient & Ingredient
