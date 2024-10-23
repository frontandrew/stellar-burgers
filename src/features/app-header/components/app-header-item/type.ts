import { PropsWithChildren } from 'react'

interface Props {
  variant: 'orders' | 'profile' | 'constructor'
}

export type AppHeaderItemProps = PropsWithChildren<Props>
