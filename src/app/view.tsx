import { FC } from 'react'

import { AppHeader } from 'features/app-header'
import { Main } from 'pages'

import style from './style.module.css'

export const App: FC = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <AppHeader />
      </header>
      <main className={style.content}>
        <Main />
      </main>
    </div>
  )
}
