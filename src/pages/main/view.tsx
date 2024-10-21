import { FC } from 'react'

import { BurgerIngredients } from 'features/burger-ingredients'

import style from './style.module.css'

export const Main: FC = () => {
  return (
    <div className={style.container}>
      <section className={style.content}>
        <BurgerIngredients />
      </section>
      <section className={style.content}>

      </section>
    </div>
  )
}
