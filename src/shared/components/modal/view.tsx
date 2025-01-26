import { FC } from 'react'
import { CloseIcon } from 'uikit'
import { Overlay } from 'components'

import { ModalProps } from './type'
import style from './style.module.css'

export const Modal: FC<ModalProps> = ({ children, close, isVisible, root }) => (
  <Overlay root={root} onClick={close} isVisible={isVisible}>
    <section
      data-test-id={'modal'}
      className={style.container}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        data-test-id={'modal-leave-button'}
        className={style.leave}
        onClick={close}
      >
        <CloseIcon type="primary"/>
      </button>
      <div className={style.content}>
        {children}
      </div>
    </section>
  </Overlay>
)
