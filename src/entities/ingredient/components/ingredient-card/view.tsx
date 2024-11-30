import { FC, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { Counter, CurrencyIcon } from 'uikit'

import { IngredientType } from '../../type'
import { IngredientViewType } from '../type'

import { IngredientCardProps } from './type'
import style from './style.module.css'

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
  const { image = '', id, name = 'unknown', price = 0, type, count = 0 } = ingredient

  const location = useLocation()

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const getDNDAcceptType = useMemo(() => (
    type === IngredientType.BUN ? IngredientType.BUN : 'other'
  ), [type])

  const [{ isDrag }, cardRef] = useDrag({
    type: `${IngredientViewType.CARD}-${getDNDAcceptType}`,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })


  const ingredientCard = (
    <li
      key={id}
      ref={cardRef}
      className={style.container}
    >
      <Link
        to={`ingredients/${id}`}
        state={{ backgroundLocation: location }}
        className={isDrag ? style.content_dragging : style.content}
      >
        <img className={style.image} src={image} alt={name}/>
        <div className={style.price}>
          <span className={'text text_type_digits-default'}>{price}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
        <span className={'text text_type_main-default ' + style.name}>{name}</span>
        {count > 0 &&
          <Counter
            count={count}
            size={'default'}
            extraClass={style.counter}
          />
        }
      </Link>
    </li>

  )

  return id && name && price ? ingredientCard : null
}
