import { Logo } from 'uikit'
import { FC } from 'react'

import { AppHeaderItem } from './components'
import style from './style.module.css'

export const AppHeader: FC = () => {
  return (
    <nav className={style.container}>
      <ul className={style.list}>
        <li className={style.item}>
          <AppHeaderItem variant='constructor' />
        </li>
        <li className={style.item}>
          <AppHeaderItem variant='orders' />
        </li>
        <li className={style.itemLogo}>
          <Logo />
        </li>
        <li className={style.item}>
          <AppHeaderItem variant='profile' />
        </li>
      </ul>
    </nav>
  )
}
