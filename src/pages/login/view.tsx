import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Button, EmailInput, PasswordInput } from 'uikit'
import { useForm } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const LoginPage: FC = () => {
  const [handleLogin] = apiSlice.useLazyLoginUserQuery()

  const {
    formRef,
    formValues,
    formChange,
    formErrors,
    formValidity,
    formSubmit,
    checkFieldValidity,
    debounceCheckFieldValidity
  } = useForm({
    submitHandler: handleLogin,
    formInitValues: { email: '', password: '' },
  })

  return (
    <div className={style.container}>
      <form
        ref={formRef}
        onChange={formChange}
        onSubmit={formSubmit}
        className={style.form}
      >
        <h1 className={'text text_type_main-medium'}>Вход</h1>
        <EmailInput
          placeholder={'E-mail'}
          value={formValues.email ?? ''}
          name={'email'}
          onBlur={checkFieldValidity}
          onChange={debounceCheckFieldValidity}
          required={true}
          tabIndex={1}
          errorText={formErrors.email}
          // @ts-expect-error-next-line
          error={!!formErrors.email}
        />
        <PasswordInput
          placeholder={'Пароль'}
          value={formValues.password ?? ''}
          name={'password'}
          onBlur={checkFieldValidity}
          onChange={debounceCheckFieldValidity}
          minLength={6}
          required={true}
          tabIndex={2}
          errorText={formErrors.password}
          // @ts-expect-error-next-line
          error={!!formErrors.password}
        />
        <Button
          htmlType={'submit'}
          disabled={!formValidity}
          tabIndex={3}
        >
          Войти
        </Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Вы — новый пользователь?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/register'} tabIndex={4}>
                Зарегистрироваться
              </NavLink>
            </span>
          </li>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Забыли пароль?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/forgot-password'} tabIndex={5}>
                Восстановить пароль
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
