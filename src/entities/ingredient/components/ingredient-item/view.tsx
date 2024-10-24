import { FC } from 'react';
import { ConstructorElement, DragIcon } from 'uikit'

import { IngredientItemProps } from './type'
import style from './style.module.css'

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient, isLocked, type }) => {
  const { name, id, image, price } = ingredient

  if (isLocked) {
    return (
      <div className={style.container}>
        <ConstructorElement
          key={id}
          type={type}
          isLocked={isLocked}
          text={name}
          price={price}
          thumbnail={image}
        />
      </div>
    )
  }

  return (
    <li className={style.container} draggable>
      <DragIcon type='primary' />
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
