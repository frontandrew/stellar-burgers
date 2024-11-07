import { FC } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { currentOrderSlice } from 'entities/order'
import { Ingredient } from 'entities/ingredient'

import style from './style.module.css'

export const EmptyConstructor: FC = () => {
  const { createNewOrder } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const [{ isOver, canDrop }, dropAreaRef] = useDrop<Ingredient, void, { isOver: boolean, canDrop: boolean }>({
    accept: 'ingredient',
    drop: (ingredient) => {
      dispatch(createNewOrder(ingredient))
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    })
  })

  const calcClassName = () => {
    if (isOver) return style.container_candrop
    if (canDrop) return style.container_showtarget
    return style.container
  }

  return (
    <div
      className={calcClassName()}
      ref={dropAreaRef}
    >
      <h3 className={style.title + ' text text_type_main-medium p-10'}>
        Перетащите ингредиенты чтобы собрать бургер
      </h3>
    </div>
  )
}