import { FC } from 'react'
import { Counter, CurrencyIcon } from 'uikit'

import { IngredientCardProps } from './type'
import style from './style.module.css'

export const IngredientCard: FC<IngredientCardProps> = ({ data, count = 0 }) => {
  /**
   * TODO: create deafult inredient image
   */
  const { image = '', id, name = 'unknown', price = 0, } = data
  return (
    <li className={style.container} key={id}>
      <img className={style.image} src={image} alt={name} />
      <div className={style.price}>
        <span className={'text text_type_digits-default'}>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <span className={'text text_type_main-default ' + style.name}>{name}</span>
      {count > 0 &&
        <Counter
          count={count}
          size="default"
          extraClass={style.counter}
        />
      }
    </li>
  )
}
