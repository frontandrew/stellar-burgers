import { FC, ReactNode } from 'react'

import style from './style.module.css'

export const TwoColumnLayout: FC<{ left?: ReactNode, right?: ReactNode }> = ({ left, right }) => (
  <div className={style.layout} id={'two-column-layout'}>
    <section className={style.content} id={'two-column-layout--left'}>{left}</section>
    <section className={style.content} id={'two-column-layout--right'}>{right}</section>
  </div>
)
