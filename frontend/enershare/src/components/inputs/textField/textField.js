
import React from "react"
import { ErrorMessage, useField } from "formik"

import { 
  Input,
  InputContainer,
  StyledErrorMessage,
} from "./textField.styled"

const TextField = ({label, placeholder, ...props}) => {
  const [field] = useField(props)

  return (
    <InputContainer>
      <label htmlFor={field.name}>{label}</label>
      <Input placeholder={placeholder}{...field}{...props}/>
      <ErrorMessage name={field.name}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
      </ErrorMessage>
    </InputContainer>
  )
}

export default TextField