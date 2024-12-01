import { FC, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button, EmailInput } from 'uikit'
import { useForm } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const ForgotPassPage: FC = () => {

  const nav = useNavigate()
  const [handleSubmit, { data }] = apiSlice.useLazyRecoverPassQuery()

  useEffect(() => {
    if (data?.success) {
      nav('/reset-password', { state: { isEmailSent: true } })
    }
  }, [data, nav])

  const { formRef, formValues, formChange, formSubmit } = useForm({
    submitHandler: handleSubmit,
    formInitValues: { email: '' },
  })

  return (
    <div className={style.container}>
      <form
        className={style.form}
        ref={formRef}
        onChange={formChange}
        onSubmit={formSubmit}
      >
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <EmailInput
          onChange={() => {}}
          placeholder={'Укажите e-mail'}
          value={formValues.email ?? ''}
          name={'email'}
        />
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Вспомнили пароль?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/login'}>
                Войти
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}