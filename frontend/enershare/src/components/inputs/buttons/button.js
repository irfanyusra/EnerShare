
import React from "react"
// import { useField } from "formik"

// import { Input } from "./textField.styled"
import { ButtonStyle } from "./button.styled"

const Button = ({text, ...props}) => {
  // const [field] = useField(props)

  return (
    <ButtonStyle>{text}</ButtonStyle>
    // <div>
    //   <label htmlFor={field.name}>{label}</label>
    //   <Input {...field}{...props}/>
    // </div>
  )
}

export default Button