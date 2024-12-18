import { FC, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector, useModal } from 'hooks'
import { Button, CurrencyIcon } from 'uikit'
import { Modal } from 'components'
import { apiSlice } from 'api'

import { IngredientType } from 'entities/ingredient'
import { currentOrderSlice, OrderDetails } from 'entities/order'
import { userSlice } from 'entities/user'

import { EmptyItem } from './componets'
import style from './style.module.css'

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = useAppSelector(userSlice.selectors.user)
  const order = useAppSelector(currentOrderSlice.selectors.order)
  const { resetOrderState } = currentOrderSlice.actions
  const [postOrder] = apiSlice.usePostOrderMutation()

  const [bun, otherIngredients] = useMemo(() => [
    order.ingredients.find(({ type }) => type === IngredientType.BUN),
    order.ingredients.filter(({ type }) => type !== IngredientType.BUN),
  ], [order.ingredients])


  const { isModalOpen, closeModal, openModal } = useModal({
    closeHandler: () => dispatch(resetOrderState()),
  })

  const handleOrderSubmit = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    if (!user) navigate('/login')
    else postOrder(order.ingredients)
  }, [order, postOrder])

  useEffect(() => {
    if (order.id) openModal()
  }, [order.id])

  return (
    <>
      <article className={style.container + ' pt-25 pb-10'}>
        <div className={style.content}>
          <EmptyItem
            orderIngredient={bun}
            key={`${bun?.orderIngredientIndex}1`}
            expectType={IngredientType.BUN}
            position={'top'}
          />

          <ul className={style.draggable}>
            {otherIngredients.length > 0
              ? otherIngredients.map(item => (
                <EmptyItem
                  orderIngredient={item}
                  key={item.orderIngredientIndex}
                  expectType={'other'}
                />
              ))
              : <EmptyItem key={`3`} expectType={'other'}/>
            }
          </ul>

          <EmptyItem
            orderIngredient={bun}
            key={`${bun?.orderIngredientIndex}2`}
            expectType={IngredientType.BUN}
            position={'bottom'}
          />
        </div>

        <div className={style.footer}>
          <div className={style.total}>
            <span className={'text text_type_digits-medium'}>{order.total}</span>
            <CurrencyIcon type={'primary'}/>
          </div>
          <Button
            type={'primary'}
            htmlType={'submit'}
            disabled={order.ingredients.length < 3}
            onClick={handleOrderSubmit}
          >
            Оформить заказ
          </Button>
        </div>
      </article>

      {order.id &&
        <Modal close={closeModal} isVisible={isModalOpen}>
          <OrderDetails orderId={order.id}/>
        </Modal>
      }
    </>
  )
}
