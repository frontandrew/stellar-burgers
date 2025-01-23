import { FC, useEffect, useState } from 'react'

import { Button, EmailInput, Input, PasswordInput } from 'uikit'
import { useAppDispatch, useAppSelector, useForm, useHotKey } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const ProfileForm: FC = () => {
  const dispatch = useAppDispatch()
  const { updateUser } = apiSlice.endpoints
  const { user } = useAppSelector((state) => state.user)

  const [isEditMode, setEditMode] = useState(false)

  const {
    formRef,
    formValues,
    formChange,
    formSubmit,
    formReset,
    formErrors,
    formValidity,
    checkFieldValidity,
  } = useForm({
    submitHandler: (args) => dispatch(updateUser.initiate(args)),
    formInitValues: { ...user!, password: '' },
  })

  const enableEditMode = () => {
    setEditMode(true)
  }

  const handleReset = () => {
    setEditMode(false)
    formReset()
  }

  useHotKey({ key: 'Escape', canUse: isEditMode, handler: handleReset })
  useEffect(() => handleReset(), [user])

  return (
    <form
      ref={formRef}
      onChange={formChange}
      onSubmit={formSubmit}
      onReset={handleReset}
      className={style.form}
    >
      <Input
        data-test-id={'name-input'}
        onIconClick={enableEditMode}
        onChange={()=>{}}
        onBlur={checkFieldValidity}
        error={!!formErrors.name}
        errorText={formErrors.name}
        required={true}
        minLength={2}
        maxLength={40}
        name={'name'}
        placeholder={'Имя'}
        value={formValues.name ?? ''}
        disabled={!isEditMode}
        {...{ icon: isEditMode ? undefined : 'EditIcon' }}
      />
      <EmailInput
        data-test-id={'email-input'}
        // @ts-expect-error-next-line
        onIconClick={enableEditMode}
        onBlur={checkFieldValidity}
        onChange={()=>{}}
        error={!!formErrors.email}
        errorText={formErrors.email}
        required={true}
        name={'email'}
        placeholder={'E-mail'}
        value={formValues.email ?? ''}
        disabled={!isEditMode}
        {...{ icon: isEditMode ? undefined : 'EditIcon' }}
      />

      {!isEditMode ?
        <Input
          onIconClick={enableEditMode}
          onChange={()=>{}}
          placeholder={'Пароль'}
          value={''}
          disabled={true}
          icon={'EditIcon'}
        /> :
        <>
          <PasswordInput
            onBlur={checkFieldValidity}
            onChange={()=>{}}
            required={false}
            name={'password'}
            placeholder={'Пароль'}
            minLength={6}
            value={formValues.password ?? ''}
            // @ts-expect-error-next-line
            error={!!formErrors.password}
            errorText={formErrors.password}
          />
          <div className={style.actions}>
            <Button
              htmlType={'reset'}
              type={'secondary'}
            >
              Отмена
            </Button>
            <Button
              htmlType={'submit'}
              disabled={!formValidity}
            >
              Сохранить
            </Button>
          </div>
        </>
      }
    </form>
  )
}
