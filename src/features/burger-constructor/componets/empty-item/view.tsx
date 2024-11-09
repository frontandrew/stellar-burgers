import { FC, useMemo } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { currentOrderSlice, OrderIngredientItem } from 'entities/order'
import { IngredientType, IngredientViewType } from 'entities/ingredient'

import { EmptyItemProps } from './type'
import style from './style.module.css'

export const EmptyItem: FC<EmptyItemProps> = ({ children, expectType, targetIndex }) => {
  const { addOrderIngredient, sortOrderIngredients } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const dndAcceptTypesMap = useMemo(() => ({
    fromOrder: `${IngredientViewType.ITEM}-${expectType}`,
    fromList: `${IngredientViewType.CARD}-${expectType}`,
  }), [expectType])

  const [{ isOver }, dropAreaRef] = useDrop<OrderIngredientItem | Ingredient, void, { isOver: boolean }>({
    accept: Object.values(dndAcceptTypesMap),
    drop: (item, monitor) => {
      if (monitor.getItemType() === dndAcceptTypesMap.fromOrder) {
        const currId = (monitor.getItem() as OrderIngredientItem).orderIngredientIndex
        dispatch(sortOrderIngredients({ currId, targId: targetIndex! }))
        return
      }

      dispatch(addOrderIngredient({ item: (item as Ingredient), targId: targetIndex! }))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // isBunOver: () => {
      //   monitor.getItemType()
      // }
    })
  })

  const isBunType = expectType === IngredientType.BUN

  const [dropAreaStyles, contentStyle] = useMemo(() => [
    !children
    ? style.droparea
    : isOver
        ? isBunType ? style.droparea : style.droparea_expanded
        : style.droparea_collapsed,

    !children
      ? style.content_collapsed
      : isOver && isBunType
        ? style.content_collapsed
        : style.content,
  ], [isOver])

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={dropAreaStyles}>
        <p className='text text_type_main-default text_color_inactive'>
          {`Добавьте ${isBunType ? 'булку' : 'ингредиент'}`}
        </p>
      </div>
      <div className={contentStyle}>
        {children}
      </div>
    </li>
  )
}
