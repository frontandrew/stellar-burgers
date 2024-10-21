import { Button, ListIcon, BurgerIcon, ProfileIcon } from 'uikit'
import { FC, PropsWithChildren } from 'react'

import { ItemProps } from './type'
import style from './style.module.css'

export const AppHeaderItem: FC<PropsWithChildren<ItemProps>> = ({ variant }) => {
  const active = matchLocation(variant)

  const iconState = active ? 'primary' : 'secondary'
  const titleState = active ? 'text_color_primary' : 'text_color_inactive'

  return (
    <Button
      extraClass={style.itemButton}
      htmlType='button'
      type='secondary'
    >
      {variant === 'orders' && <ListIcon type={iconState} />}
      {variant === 'constructor' && <BurgerIcon type={iconState} />}
      {variant === 'profile' && <ProfileIcon type={iconState} />}
      <span className={titleState}>
        {variant === 'orders' && 'Лента заказов'}
        {variant === 'constructor' && 'Конструктор'}
        {variant === 'profile' && 'Личный кабинет'}
      </span>
    </Button>
  )
}

function matchLocation(matcher: string): boolean {
  if (location.pathname.startsWith('/' + matcher)) return true
  return false
}
