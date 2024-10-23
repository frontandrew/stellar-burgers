import { FC } from 'react'

import { BurgerIngredients } from 'features/burger-ingredients'
import { BurgerConstructor } from 'features/burger-constructor'

import style from './style.module.css'

export const Main: FC = () => {
  return (
    <div className={style.container}>
      <section className={style.content}>
        <BurgerIngredients />
      </section>
      <section className={style.content}>
        <BurgerConstructor />
      </section>
    </div>
  )
}
