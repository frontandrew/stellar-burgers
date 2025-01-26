import { useMatch, useNavigate } from 'react-router-dom'
import { FC } from 'react'

import { Button } from 'uikit'

import { NavItemProps } from './type'
import style from './style.module.css'

export const NavItem: FC<NavItemProps> = ({ to, title, size = 'default', Icon }) => {
  const nav = useNavigate()
  const match = useMatch(to)

  return (
    <Button
      data-test-id={`navigate-${to.slice(1)}`}
      onClick={() => nav(to)}
      extraClass={style.item}
      htmlType='button'
      type='secondary'
    >
      {Icon && <Icon type={match ? 'primary' : 'secondary'}/>}
      <span
        className={`text text_type_main-${size} text_color_${match ? 'primary' : 'inactive'}`}
      >
        {title}
      </span>
    </Button>
  )
}
