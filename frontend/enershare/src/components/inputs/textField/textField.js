
import React from "react"
import { ErrorMessage, useField } from "formik"

import { Input, InputContainer} from "./textField.styled"

const TextField = ({label, ...props}) => {
  const [field] = useField(props)

  return (
    <InputContainer>
      <label htmlFor={field.name}>{label}</label>
      <Input {...field}{...props}/>
      <ErrorMessage name={field.name}/>
    </InputContainer>
  )
}

export default TextField