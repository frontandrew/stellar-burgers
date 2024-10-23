import { FC } from 'react';
import { ConstructorElement, DragIcon } from 'uikit'

import { IngredientItemProps } from './type'
import style from './style.module.css'

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient, isLocked, type }) => {
  const { name, id, image, price } = ingredient

  return (
    <li className={style.container} draggable={!isLocked}>
      {!isLocked && <DragIcon type='primary' />}
      <ConstructorElement
        key={id}
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
}
