import { FC, useState } from 'react'
import { Tab } from 'uikit'

import style from './style.module.css'

export const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState('buns')

  return (
    <article className={style.container}>
      <div className={style.header}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <div className={style.tabs}>
          <Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value='sauses' active={current === 'sauses'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value='mains' active={current === 'mains'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      <ul className={style.content}>
        {/* <li className={style.type}> */}
        {/* <h3 className={style.ingredients_type_name}></h3> */}
        {/* </li> */}
      </ul>
    </article>
  )
}
