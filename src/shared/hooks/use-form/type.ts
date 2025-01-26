import { ChangeEvent, FocusEvent, FormEvent, MutableRefObject } from 'react'

export type UseFormType = <T>(pros: { submitHandler: (args: T) => void, readonly formInitValues: T }) => {
  formRef: MutableRefObject<HTMLFormElement | null>
  formValues: { [K in keyof T]: T[K] }
  formErrors: { [K in keyof T]: string }
  formChange: (event: FormEvent<HTMLFormElement>) => void
  formSubmit: (event: FormEvent<HTMLFormElement>) => void
  formReset: () => void
  formValidity: boolean
  checkFieldValidity: (event?: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement> | undefined) => void
  debounceCheckFieldValidity: (event?: ChangeEvent<HTMLInputElement> | undefined) => void
}
