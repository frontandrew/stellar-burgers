import { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceCallback } from 'hooks'

import { getInitErrors } from './utils'
import { UseFormType } from './type'

export const useForm: UseFormType = ({ submitHandler, formInitValues }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formValues, setFormValues] = useState(formInitValues)
  const [formErrors, setFormErrors] = useState<{ [K in keyof typeof formInitValues]: string }>(
    () => getInitErrors(formInitValues),
  )
  const [formValidity, setFormValidity] = useState(true)

  useEffect(() => {
    const firstInput = formRef.current?.elements[0]
    if (firstInput instanceof HTMLInputElement) firstInput.focus()
  }, [])

  const formChange = useCallback((event: FormEvent<HTMLFormElement>) => {
    if (event.target instanceof HTMLInputElement) {
      const { value, name } = event.target
      setFormValues({ ...formValues, [name]: value })
    }
  }, [formValues])

  const formSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = formRef.current?.checkValidity()
    if (submitHandler && isValid) submitHandler({ ...formValues })
  }, [formValues, submitHandler])

  const formReset = useCallback(() => {
    setFormValues(formInitValues)
    setFormErrors(getInitErrors(formInitValues))
  }, [formInitValues])

  const checkFieldValidity = useCallback(
    (event?: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement> | undefined) => {
      if (event?.target instanceof HTMLInputElement) {
        const { name, validationMessage } = event.target
        setFormErrors({ ...formErrors, [name]: validationMessage })
        setFormValidity(Boolean(formRef.current?.checkValidity()))
      }
    }, [formErrors],
  )

  const debounceCheckFieldValidity = useDebounceCallback(checkFieldValidity, 500)

  return {
    formRef,
    formValues,
    formErrors,
    formChange,
    formSubmit,
    formReset,
    formValidity,
    checkFieldValidity,
    debounceCheckFieldValidity,
  }
}
