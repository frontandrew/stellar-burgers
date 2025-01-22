import { FC, useCallback, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from 'hooks'
import { ConstructorElement } from 'uikit'

import { IngredientBurger, IngredientType, IngredientViewType } from 'entities/ingredient'

import { burgerConstructorSlice } from '../../model'
import { IngredientItemDNDWrapper } from '../ingredient-item-dnd-wrapper'

import { BurgerConstructorItemProps, DropItemType } from './type'
import style from './style.module.css'

export const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({
  ingredient: ingr,
  position,
  expectType,
}) => {
  const isBunType = expectType === IngredientType.BUN

  const {
    addIngredient,
    removeIngredient,
    sortIngredients,
  } = burgerConstructorSlice.actions
  const dispatch = useAppDispatch()

  const handleRemove = useCallback(() => {
    if (ingr)
    dispatch(removeIngredient(ingr?.inBurgerConstructorIndex))
  }, [dispatch, ingr, removeIngredient])

  const handleDrop: (x: DropItemType) => void = useCallback((item) => {
    if (!item.inBurgerConstructorIndex) {

      if (isBunType && ingr) dispatch(removeIngredient(ingr.inBurgerConstructorIndex))
      dispatch(addIngredient({ item, targId: ingr?.inBurgerConstructorIndex }))
    } else dispatch(sortIngredients({
      currId: item.inBurgerConstructorIndex,
      targId: ingr!.inBurgerConstructorIndex,
    }))
  }, [addIngredient, dispatch, ingr, isBunType, removeIngredient, sortIngredients])

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const dndAcceptTypesMap = useMemo(() => ({
    fromOrder: `${IngredientViewType.ITEM}-${expectType}`,
    fromList: `${IngredientViewType.CARD}-${expectType}`,
  }), [expectType])

  const [{ isOver }, dropAreaRef] = useDrop<DropItemType, void, {
    isOver: boolean
  }>({
    accept: Object.values(dndAcceptTypesMap),
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }, [dndAcceptTypesMap, handleDrop])

  const [dropAreaStyles, contentStyle] = useMemo(() => [
    !ingr
      ? style.droparea
      : isOver
        ? isBunType ? style.droparea : style.droparea_expanded
        : style.droparea_collapsed,

    !ingr
      ? style.content_collapsed
      : isOver && isBunType
        ? style.content_collapsed
        : style.content,
  ], [isBunType, isOver, ingr])

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={dropAreaStyles}>
        <div className={style.empty_container}>
          <div className={style.empty_item}>
            <p className={'text text_type_main-default'}>
              {`Добавьте ${isBunType ? 'булку' : 'ингредиент'}`}
            </p>
            <ConstructorElement
              text={'filler text filler text filler text'}
              thumbnail={'null'}
              price={0}
              type={position}
            />
          </div>
        </div>
      </div>
      <div className={contentStyle}>
        {ingr &&
          <IngredientItemDNDWrapper ingredient={ingr} isLocked={isBunType}>
            <IngredientBurger
              {...ingr}
              position={position}
              isLocked={isBunType}
              removeHandler={handleRemove}
            />
          </IngredientItemDNDWrapper>
        }
      </div>
    </li>
  )
}
