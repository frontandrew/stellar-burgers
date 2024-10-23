import { FC, ReactNode, useState } from 'react'
import { Tab } from 'uikit'

import { Ingredient, IngredientType } from 'entities/ingredient'

import { IngredientsGroup } from './components'
import { IngredientsGroupNames } from './consts'
import style from './style.module.css'

import { data } from './ingrs-mock'

export const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState(IngredientType[0])

  const listedData: Record<string, Ingredient[]> = separateGroupsByType(data)

  function separateGroupsByType(array: Array<Ingredient>): typeof listedData {
    return {
      [IngredientType[0]]: array.filter(({ type }) => type === IngredientType[0]),
      [IngredientType[1]]: array.filter(({ type }) => type === IngredientType[1]),
      [IngredientType[2]]: array.filter(({ type }) => type === IngredientType[2]),
    }
  }

  function renderGroups(data: typeof listedData): ReactNode[] {
    return Object.entries(data).map(([key, value], index) => (
      <IngredientsGroup
        category={IngredientsGroupNames[IngredientType[index]]}
        ingredients={value}
        key={key}
      />
    ))
  }

  return (
    <article className={style.container + ' pt-10'}>
      <div className={style.header}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <div className={style.tabs}>
          <Tab
            value={IngredientType[0]}
            active={current === IngredientType[0]}
            onClick={setCurrent}
          >
            {IngredientsGroupNames[IngredientType[0]]}
          </Tab>
          <Tab
            value={IngredientType[1]}
            active={current === IngredientType[1]}
            onClick={setCurrent}
          >
            {IngredientsGroupNames[IngredientType[1]]}
          </Tab>
          <Tab
            value={IngredientType[2]}
            active={current === IngredientType[2]}
            onClick={setCurrent}
          >
            {IngredientsGroupNames[IngredientType[2]]}
          </Tab>
        </div>
      </div>
      <ul className={style.content}>
        {renderGroups(listedData)}
      </ul>
    </article>
  )
}
