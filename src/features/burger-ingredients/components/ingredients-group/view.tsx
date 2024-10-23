import { FC } from 'react'

import { IngredientCard } from 'entities/ingredient'

import { IngredientsGroupProps } from './type'
import style from './style.module.css'

export const IngredientsGroup: FC<IngredientsGroupProps> = ({ ingredients = [], category = 'unknown' }) => (
  <li className={style.container} >
    <h3 className={'text text_type_main-medium'}>{category}</h3>
    <ul className={style.list + ' pr-4 pl-4'}>
      {Array.isArray(ingredients) && ingredients.length > 0
        ? ingredients.map((ingr) => <IngredientCard data={ingr} key={ingr.id} />)
        : null
      }
    </ul>
  </li>
)
