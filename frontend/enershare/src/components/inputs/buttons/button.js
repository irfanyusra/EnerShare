
import React from "react"

import { ButtonStyle } from "./button.styled"

const Button = ({text, ...props}) => {

  return (
    <ButtonStyle {...props}>{text}</ButtonStyle>
  )
}

export default Button