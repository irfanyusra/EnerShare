
import React from "react"
import { ErrorMessage, useField } from "formik"

import { Input } from "./textField.styled"

const TextField = ({label, ...props}) => {
  const [field] = useField(props)

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <Input {...field}{...props}/>
      <ErrorMessage name={field.name}/>
    </div>
  )
}

export default TextField