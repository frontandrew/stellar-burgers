import { FC } from 'react'
import { remove } from 'lodash-es'
import { Button, CurrencyIcon } from 'uikit'

import { IngredientItem, IngredientType } from 'entities/ingredient'

import style from './style.module.css'
import { data } from './ingrs-mock'

const tolal = 610
const bun = remove(data, function ({ type }) {
  return type === IngredientType[0]
})[0]

export const BurgerConstructor: FC = () => {

  return (
    <article className={style.container + ' pt-25 pr-4 pb-10 pl-4'}>
      <ul className={style.content}>
        <IngredientItem ingredient={bun} isLocked={true} type='top' key={bun.id} />
        {data.map(item => <IngredientItem ingredient={item} key={item.id} />)}
        <IngredientItem ingredient={bun} isLocked={true} type='bottom' key={bun.id + 'aferfae'} />
      </ul>
      <div className={style.footer}>
        <div className={style.total}>
          <span className='text text_type_digits-medium'>{tolal}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' htmlType='submit' disabled={data.length < 3}>
          Оформить заказ
        </Button>
      </div>
    </article>
  )
}
